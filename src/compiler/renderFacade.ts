import { relative } from "path";
import { compareNaturally } from "~/compiler/compareNaturally";
import { type ExportDefinition, renderExports } from "~/compiler/renderExports";
import { renderJSDocs } from "~/compiler/renderJSDocs";
import { type FacadeSpecification } from "~/compiler/resolveFacadeDefinition";
import { type MethodSpecification } from "~/compiler/resolveMethodDefinition";

export function renderFacade(
  facade: FacadeSpecification,
  methods: MethodSpecification[],
  types: ExportDefinition[],
  base: string,
): string {
  type ImportNames = {
    defaults: Set<string>;
    named: Set<string>;
    namespaces: Set<string>;
  };

  const codeImports = new Map<string, ImportNames>();

  const typeImports = new Map<string, ImportNames>();

  const assignmentLines: string[] = [];

  function getImportPath(filename: string) {
    return `./${relative(base, filename).replace(/\\/g, "/")}`;
  }

  function addImport(
    name: string,
    filename: string,
    options: {
      from?: string;
      isType?: boolean;
      kind?: "default" | "named" | "namespace";
      localName?: string;
    } = {},
  ) {
    const from = options.from ?? getImportPath(filename);

    const kind = options.kind ?? "named";

    const localName = options.localName ?? name;

    const renderedName = name === localName ? name : `${name} as ${localName}`;

    const key =
      kind === "default"
        ? "defaults"
        : kind === "namespace"
          ? "namespaces"
          : "named";

    const value = kind === "named" ? renderedName : localName;

    if (options.isType && codeImports.get(from)?.[key].has(value)) {
      return;
    }

    if (!options.isType) {
      typeImports.get(from)?.[key].delete(value);
    }

    const imports = options.isType ? typeImports : codeImports;

    const names = imports.get(from) ?? {
      defaults: new Set<string>(),
      named: new Set<string>(),
      namespaces: new Set<string>(),
    };

    if (kind === "default") {
      names.defaults.add(localName);
    }

    if (kind === "namespace") {
      names.namespaces.add(localName);
    }

    if (kind === "named") {
      names.named.add(renderedName);
    }

    imports.set(from, names);
  }

  for (const dependency of facade.class.imports) {
    addImport(dependency.name, dependency.filename ?? "", {
      from: dependency.filename
        ? getImportPath(dependency.filename)
        : dependency.moduleSpecifier,
      isType: dependency.isType,
      kind: dependency.kind,
      localName: dependency.localName,
    });
  }

  for (const method of methods) {
    addImport(method.name, method.filename);

    for (const dependency of method.instanceSignature?.imports ?? []) {
      addImport(dependency.name, dependency.filename ?? "", {
        from: dependency.filename
          ? getImportPath(dependency.filename)
          : dependency.moduleSpecifier,
        isType: true,
        kind: dependency.kind,
        localName: dependency.localName,
      });
    }

    const documentation = renderJSDocs(method.documentation, 1);

    assignmentLines.push(
      ...(documentation ? [documentation] : []),
      `${method.name},`,
      ...method.methodAliases.flatMap((alias) => [
        `/** @alias ${facade.name}.${method.name} */`,
        `${alias}: ${method.name},`,
      ]),
    );
  }

  if (facade.callable) {
    addImport(facade.callable.name, facade.callable.filename);
  }

  const renderImportLines = (
    imports: Map<string, ImportNames>,
    isType: boolean,
  ) =>
    Array.from(imports, ([from, names]) => ({ from, names }))
      .sort((left, right) => compareNaturally(left.from, right.from))
      .flatMap(({ from, names }) => {
        const defaults = Array.from(names.defaults).sort(compareNaturally);

        const named = Array.from(names.named).sort(compareNaturally);

        const namespaces = Array.from(names.namespaces).sort(compareNaturally);

        const clauses: string[] = [];

        for (const name of defaults) {
          clauses.push(name);
        }

        for (const name of namespaces) {
          clauses.push(`* as ${name}`);
        }

        if (named.length) {
          clauses.push(`{ ${named.join(", ")} }`);
        }

        return clauses.map(
          (clause) =>
            `import${isType ? " type" : ""} ${clause} from ${JSON.stringify(
              from,
            )};`,
        );
      });

  const typeImportLines = renderImportLines(typeImports, true);

  const codeImportLines = renderImportLines(codeImports, false);

  const importCode = [
    ...(typeImportLines.length ? [typeImportLines.join("\n")] : []),
    ...(codeImportLines.length ? [codeImportLines.join("\n")] : []),
  ].join("\n\n");

  const facadeDocumentation = renderJSDocs(facade.documentation);

  const callable = facade.callable;

  const facadeClassName = facade.name;

  const instanceMethods = methods.filter(
    (method) => method.instanceCallable !== false,
  );

  const instanceTypeCode = Array.from(
    new Set(
      instanceMethods.flatMap(
        (method) => method.instanceSignature?.declarations ?? [],
      ),
    ),
  ).join("\n\n");

  const replaceTypeParameter = (
    value: string,
    parameter: string,
    replacement: string,
  ) =>
    value.replace(
      new RegExp(
        `\\b${parameter.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\b`,
        "g",
      ),
      replacement,
    );

  const renderInstanceMethod = (method: MethodSpecification, name: string) => {
    const valueType = facade.class.valueTypeParameter ?? "unknown";
    const overloads = Array.from(
      new Set(
        method.instanceSignature?.overloads.map((overload) => {
          const boundTypeParameter =
            facade.class.inputTypeParameter && overload.boundTypeParameter;
          const replaceBoundType = (value: string) =>
            boundTypeParameter
              ? replaceTypeParameter(value, boundTypeParameter, valueType)
              : value;
          const typeParameters = overload.typeParameters
            .filter(
              (_, index) =>
                overload.typeParameterNames[index] !== boundTypeParameter,
            )
            .map(replaceBoundType);
          const returnType = replaceBoundType(overload.returnType).replace(
            new RegExp(`^${overload.firstParameterName}\\s+is\\s+`),
            "this is ",
          );
          const resultType =
            method.instanceCallable === "chainable" &&
            !returnType.startsWith("this is ")
              ? `${facadeClassName}<${returnType}>`
              : returnType;

          return `  ${name}${
            typeParameters.length ? `<${typeParameters.join(", ")}>` : ""
          }(${overload.parameters
            .map(replaceBoundType)
            .join(", ")}): ${resultType};`;
        }) ?? [],
      ),
    );

    const call = `${method.name}(this.valueOf(), ...args)`;

    const implementation =
      `  ${name}(...args: any[]): any {\n` +
      `    // @ts-ignore\n` +
      `    return ${
        method.instanceCallable === "chainable"
          ? `new ${facadeClassName}(${call})`
          : call
      };\n` +
      `  }`;

    return [...overloads, implementation].join("\n");
  };

  const instanceMethodBlocks = instanceMethods.flatMap((method) => {
    const documentation = renderJSDocs(method.documentation, 1);

    return [
      [
        documentation && `  ${documentation}`,
        renderInstanceMethod(method, method.name),
      ]
        .filter(Boolean)
        .join("\n"),
      ...method.methodAliases.map(
        (alias) =>
          `  /** @alias ${facade.name}.${method.name} */\n` +
          `  ${alias} = this.${method.name};`,
      ),
    ];
  });

  const classEnd = facade.class.code.lastIndexOf("}");

  const classCode = instanceMethodBlocks.length
    ? `${facade.class.code.slice(0, classEnd).trimEnd()}\n\n` +
      `${instanceMethodBlocks.join(
        "\n\n",
      )}\n${facade.class.code.slice(classEnd)}`
    : facade.class.code;

  const instanceCallSignature = facade.class.callable
    ? `\n\ninterface ${facadeClassName}${
        facade.class.typeParameters.length
          ? `<${facade.class.typeParameters.join(", ")}>`
          : ""
      } {\n  (this: ThisParameterType<${
        facade.class.valueTypeParameter ?? "never"
      }>, ...args: Parameters<${
        facade.class.valueTypeParameter ?? "never"
      }>): ReturnType<${facade.class.valueTypeParameter ?? "never"}>;\n}`
    : "";

  const facadeDeclarationTypeParameters =
    facade.class.declarationTypeParameters;

  const typeName = `${facade.name}Instance`;

  const typeCode = `\n\nexport type ${typeName}${
    facadeDeclarationTypeParameters.length
      ? `<${facadeDeclarationTypeParameters
          .map((param) => {
            param = param.replace(/^const\s+/, "");

            if (param.indexOf("=") === -1) {
              param = `${param} = ${param.split(" extends ")[1] || "unknown"}`;
            }

            return param;
          })
          .join(", ")}>`
      : ""
  } = ${
    facade.class.typeParameterNames.length
      ? `${facade.name}<${facade.class.typeParameterNames.join(", ")}>`
      : facade.name
  }`;

  const factoryName = facade.factory;

  const factoryCode = factoryName
    ? `\n\nfunction ${factoryName}${
        facade.class.constructor.typeParameters.length
          ? `<${facade.class.constructor.typeParameters.join(", ")}>`
          : ""
      }(${facade.class.constructor.parameters.join(", ")}): ${facadeClassName}${
        facade.class.constructor.typeParameterNames.length
          ? `<${facade.class.constructor.typeParameterNames.join(", ")}>`
          : ""
      } {\n` +
      `  return new ${facadeClassName}(${facade.class.constructor.arguments.join(
        ", ",
      )});\n` +
      `}`
    : "";

  const exportNames = [facade.name, ...(factoryName ? [factoryName] : [])];

  const exportCode = callable
    ? `\n\nconst Wrapped${facade.name} = new Proxy(${facade.name}WithMethods as typeof ${facade.name}WithMethods & typeof ${callable.name}, {\n` +
      `  apply(_target, _thisArgument, argumentsList) {\n` +
      `    return ${callable.name}(...argumentsList);\n` +
      `  },\n` +
      `});\n\n` +
      `export { Wrapped${facade.name} as ${facade.name}${
        factoryName ? `, ${factoryName}` : ""
      } };\n`
    : `\n\nexport { ${exportNames.join(", ")} };\n`;

  return (
    (
      `// This file is generated. Do not edit it directly.\n\n` +
      importCode +
      (instanceTypeCode ? `\n\n${instanceTypeCode}` : "") +
      `\n\n` +
      classCode +
      instanceCallSignature +
      `\n\n` +
      (facadeDocumentation ? `${facadeDocumentation}\n` : "") +
      `const ${facade.name}WithMethods = Object.assign(${facadeClassName}, {\n  ` +
      assignmentLines.join("\n  ") +
      `\n});` +
      typeCode +
      factoryCode +
      exportCode +
      (types.length ? `\n${renderExports(types, base)}` : "")
    ).trimEnd() + "\n"
  );
}
