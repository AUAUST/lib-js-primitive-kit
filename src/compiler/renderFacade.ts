import { relative } from "path";
import {
  compareNaturally,
  ExportDefinition,
  renderExports,
} from "~/compiler/renderBarrel";
import { renderJSDocs } from "~/compiler/renderJSDocs";
import { FacadeSpecification } from "~/compiler/resolveFacadeDefinition";
import { MethodSpecification } from "~/compiler/resolveMethodDefinition";

export function renderFacade(
  facade: FacadeSpecification,
  methods: MethodSpecification[],
  types: ExportDefinition[],
  base: string,
): string {
  const imports = new Map<string, Set<string>>();
  const assignmentLines: string[] = [];

  function addImport(name: string, filename: string) {
    const from = `./${relative(base, filename).replace(/\\/g, "/")}`;
    const names = imports.get(from) ?? new Set<string>();
    names.add(name);
    imports.set(from, names);
  }

  for (const method of methods) {
    addImport(method.name, method.filename);

    const documentation = renderJSDocs(method.documentation, 1);

    assignmentLines.push(
      ...(documentation ? [documentation] : []),
      `${method.name},`,
      ...method.staticAliases.flatMap((alias) => [
        `/** @alias ${facade.name}.${method.name} */`,
        `${alias}: ${method.name},`,
      ]),
    );
  }

  if (facade.callable) {
    addImport(facade.callable.name, facade.callable.filename);
  }

  const importLines = Array.from(imports, ([from, names]) => ({
    from,
    names: Array.from(names).sort(compareNaturally),
  }))
    .sort((left, right) => compareNaturally(left.from, right.from))
    .map(
      ({ from, names }) =>
        `import { ${names.join(", ")} } from ${JSON.stringify(from)};`,
    );

  const facadeDocumentation = renderJSDocs(facade.documentation);
  const callable = facade.callable;
  const exportCode = callable
    ? `\n\nconst Wrapped${facade.name} = new Proxy(${facade.name} as typeof ${facade.name} & typeof ${callable.name}, {\n` +
      `  apply(_target, _thisArgument, argumentsList) {\n` +
      `    return ${callable.name}(...argumentsList);\n` +
      `  },\n` +
      `});\n\n` +
      `export { Wrapped${facade.name} as ${facade.name} };\n`
    : `\n\nexport { ${facade.name} };\n`;

  return (
    `// This file is generated. Do not edit it directly.\n\n` +
    importLines.join("\n") +
    `\n\n` +
    (facadeDocumentation ? `${facadeDocumentation}\n` : "") +
    `class ${facade.name}Base${facade.extends ? ` extends ${facade.extends}` : ""} {}\n\n` +
    `const ${facade.name} = Object.assign(${facade.name}Base, {\n  ` +
    assignmentLines.join("\n  ") +
    `\n});` +
    exportCode +
    (types.length ? `\n${renderExports(types, base)}` : "")
  ).trimEnd() + "\n";
}
