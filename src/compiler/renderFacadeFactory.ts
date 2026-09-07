import type { FacadeSpecification } from "~/compiler/specifications";

export function renderFacadeFactory(facade: FacadeSpecification): string {
  if (!facade.factory) return "";

  const constructor = facade.class.constructor;
  return (
    `function ${facade.factory}${
      constructor.typeParameters.length
        ? `<${constructor.typeParameters.join(", ")}>`
        : ""
    }(${constructor.parameters.join(", ")}): ${facade.name}${
      constructor.typeParameterNames.length
        ? `<${constructor.typeParameterNames.join(", ")}>`
        : ""
    } {\n` +
    `  return new ${facade.name}(${constructor.arguments.join(", ")});\n` +
    `}`
  );
}
