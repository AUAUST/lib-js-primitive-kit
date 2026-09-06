import { relative } from "path";
import { compareNaturally } from "~/compiler/compareNaturally";
import { ExportDefinition, renderExports } from "~/compiler/renderExports";
import { renderJSDocs } from "~/compiler/renderJSDocs";
import { FacadeSpecification } from "~/compiler/resolveFacadeDefinition";
import { MethodSpecification } from "~/compiler/resolveMethodDefinition";

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

    const imports = options.isType ? typeImports : codeImports;

    const names = imports.get(from) ?? {
      defaults: new Set<string>(),
      named: new Set<string>(),
      namespaces: new Set<string>(),
    };

    const kind = options.kind ?? "named";

    const localName = options.localName ?? name;

    if (kind === "default") {
      names.defaults.add(localName);
    }

    if (kind === "namespace") {
      names.namespaces.add(localName);
    }

    if (kind === "named") {
      names.named.add(name === localName ? name : `${name} as ${localName}`);
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
            `import${isType ? " type" : ""} ${clause} from ${JSON.stringify(from)};`,
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

  const facadeClassType = facade.class.typeParameterNames.length
    ? `${facade.class.name}<${facade.class.typeParameterNames.join(", ")}>`
    : facade.class.name;

  const instanceMethods = methods.filter(
    (method) => method.instanceCallable !== false,
  );

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

  const renderInstanceDeclaration = (
    method: MethodSpecification,
    name: string,
  ) => {
    const signature = method.instanceSignature;

    const boundTypeParameter =
      facade.class.inputTypeParameter && signature?.boundTypeParameter;

    const valueType = facade.class.valueTypeParameter ?? "unknown";

    const typeParameters = signature?.typeParameters
      .filter(
        (_, index) =>
          signature.typeParameterNames[index] !== boundTypeParameter,
      )
      .map((parameter) =>
        boundTypeParameter
          ? replaceTypeParameter(parameter, boundTypeParameter, valueType)
          : parameter,
      );

    const typeArguments = signature?.typeParameterNames.map((parameter) =>
      parameter === boundTypeParameter ? valueType : parameter,
    );

    const methodType = `typeof ${method.name}${
      typeArguments?.length ? `<${typeArguments.join(", ")}>` : ""
    }`;

    const returnType = `ReturnType<${methodType}>`;

    const resultType =
      method.instanceCallable === "chainable"
        ? facade.class.typeParameterNames.length
          ? `${facadeClassName}<${returnType}>`
          : facadeClassName
        : returnType;

    return `declare ${name}: ${
      typeParameters?.length ? `<${typeParameters.join(", ")}>` : ""
    }(...args: FacadeMethodArguments<${methodType}>) => ${resultType};`;
  };

  const instanceTypeCode = instanceMethods.length
    ? `\n\ntype FacadeMethodArguments<Method extends (...args: any[]) => any> =\n` +
      `  Parameters<Method> extends [unknown, ...infer Args] ? Args : never;`
    : "";

  const instanceDeclarationLines = instanceMethods.flatMap((method) => {
    const documentation = renderJSDocs(method.documentation, 1);

    return [
      ...(documentation ? [documentation] : []),
      renderInstanceDeclaration(method, method.name),
      ...method.methodAliases.flatMap((alias) => [
        `/** @alias ${facade.name}.${method.name} */`,
        renderInstanceDeclaration(method, alias),
      ]),
    ];
  });

  const facadeDeclarationTypeParameters =
    facade.class.declarationTypeParameters;

  const instanceRuntimeCode = instanceMethods.some(
    (method) => method.instanceCallable,
  )
    ? `\n\n${[
        instanceMethods.some((method) => method.instanceCallable === true)
          ? `function _wrap(method: any) {\n` +
            `  return function (this: { valueOf(): unknown }, ...args: any[]) {\n` +
            `    return method(this.valueOf(), ...args);\n` +
            `  };\n` +
            `}`
          : "",

        instanceMethods.some(
          (method) => method.instanceCallable === "chainable",
        )
          ? `function _wrapChainable(method: any) {\n` +
            `  return function (this: { valueOf(): unknown }, ...args: any[]) {\n` +
            `    return new ${facadeClassName}(method(this.valueOf(), ...args));\n` +
            `  };\n` +
            `}`
          : "",

        `let _wrapped: (...args: any[]) => any;`,

        `Object.assign(${facadeClassName}.prototype, {\n  ` +
          instanceMethods
            .flatMap((method) => {
              const wrapper =
                method.instanceCallable === "chainable"
                  ? "_wrapChainable"
                  : "_wrap";

              return method.methodAliases.length === 0
                ? [`${method.name}: ${wrapper}(${method.name}),`]
                : [
                    `${method.name}: (_wrapped = ${wrapper}(${method.name})),`,
                    ...method.methodAliases.map(
                      (alias) => `${alias}: _wrapped,`,
                    ),
                  ];
            })
            .join("\n  ") +
          `\n});`,
      ]
        .filter(Boolean)
        .join("\n\n")}`
    : "";

  const exportCode = callable
    ? `\n\nconst Wrapped${facade.name} = new Proxy(${facade.name}WithMethods as typeof ${facade.name}WithMethods & typeof ${callable.name}, {\n` +
      `  apply(_target, _thisArgument, argumentsList) {\n` +
      `    return ${callable.name}(...argumentsList);\n` +
      `  },\n` +
      `});\n\n` +
      `export { Wrapped${facade.name} as ${facade.name} };\n`
    : `\n\nexport { ${facade.name} };\n`;

  return (
    (
      `// This file is generated. Do not edit it directly.\n\n` +
      importCode +
      instanceTypeCode +
      `\n\n` +
      facade.class.code +
      `\n\n` +
      `class ${facadeClassName}${
        facadeDeclarationTypeParameters.length
          ? `<${facadeDeclarationTypeParameters.join(", ")}>`
          : ""
      } extends ${facadeClassType} {${
        instanceDeclarationLines.length
          ? `\n  ${instanceDeclarationLines.join("\n  ")}\n`
          : ""
      }}\n\n` +
      (facadeDocumentation ? `${facadeDocumentation}\n` : "") +
      `const ${facade.name}WithMethods = Object.assign(${facadeClassName}, {\n  ` +
      assignmentLines.join("\n  ") +
      `\n});` +
      instanceRuntimeCode +
      exportCode +
      (types.length ? `\n${renderExports(types, base)}` : "")
    ).trimEnd() + "\n"
  );
}
