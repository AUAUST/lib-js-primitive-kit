import { relative } from "path";
import { renderJSDocs } from "~/compiler/renderJSDocs";
import { FacadeSpecification } from "~/compiler/resolveFacadeDefinition";
import { MethodSpecification } from "~/compiler/resolveMethodDefinition";

export function renderFacade(
  facade: FacadeSpecification,
  methods: MethodSpecification[],
  base: string,
): string {
  const importLines: string[] = [];
  const assignmentLines: string[] = [];

  for (const method of methods) {
    importLines.push(
      `import { ${method.name} } from "./${relative(base, method.filename).replace(/\\/g, "/")}";`,
    );

    assignmentLines.push(
      renderJSDocs(method.documentation, 1),
      `${method.name},`,
      ...method.staticAliases.flatMap((alias) => [
        `/** @alias ${facade.name}.${method.name} */`,
        `${alias}: ${method.name},`,
      ]),
    );
  }

  return (
    `// This file is generated. Do not edit it directly.\n\n` +
    importLines.join("\n") +
    `\n\n` +
    `class ${facade.name}Base${facade.extends ? ` extends ${facade.extends}` : ""} {}\n\n` +
    `const ${facade.name} = Object.assign(${facade.name}Base, {\n  ` +
    assignmentLines.join("\n  ") +
    `\n});\n`
  );
}
