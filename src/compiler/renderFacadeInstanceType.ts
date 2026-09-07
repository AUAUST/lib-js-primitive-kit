import type { FacadeSpecification } from "~/compiler/specifications";

export function renderFacadeInstanceType(facade: FacadeSpecification): string {
  const parameters = facade.class.declarationTypeParameters.map((parameter) => {
    parameter = parameter.replace(/^const\s+/, "");

    if (!parameter.includes("=")) {
      parameter = `${parameter} = ${parameter.split(" extends ")[1] || "unknown"}`;
    }

    return parameter;
  });

  const reference = facade.class.typeParameterNames.length
    ? `${facade.name}<${facade.class.typeParameterNames.join(", ")}>`
    : facade.name;

  return `export type ${facade.name}Instance${parameters.length ? `<${parameters.join(", ")}>` : ""} = ${reference}`;
}
