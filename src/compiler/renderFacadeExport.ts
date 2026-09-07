import type { FacadeSpecification } from "~/compiler/specifications";

export function renderFacadeExport(facade: FacadeSpecification): string {
  if (!facade.callable) {
    return `export { ${[facade.name, facade.factory].filter(Boolean).join(", ")} };\n`;
  }

  return (
    `const Wrapped${facade.name} = new Proxy(${facade.name}WithMethods as typeof ${facade.name}WithMethods & typeof ${facade.callable.name}, {\n` +
    `  apply(_target, _thisArgument, argumentsList) {\n` +
    `    return ${facade.callable.name}(...argumentsList);\n` +
    `  },\n` +
    `});\n\n` +
    `export { Wrapped${facade.name} as ${facade.name}${facade.factory ? `, ${facade.factory}` : ""} };\n`
  );
}
