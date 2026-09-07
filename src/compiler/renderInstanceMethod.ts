import type {
  FacadeSpecification,
  MethodSpecification,
} from "~/compiler/specifications";

function replaceTypeParameter(
  value: string,
  parameter: string,
  replacement: string,
): string {
  return value.replace(
    new RegExp(
      `\\b${parameter.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\b`,
      "g",
    ),
    replacement,
  );
}

export function renderInstanceMethod(
  facade: FacadeSpecification,
  method: MethodSpecification,
  name: string,
): string {
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
            ? `${facade.name}<${returnType}>`
            : returnType;

        return `  ${name}${typeParameters.length ? `<${typeParameters.join(", ")}>` : ""}(${overload.parameters.map(replaceBoundType).join(", ")}): ${resultType};`;
      }) ?? [],
    ),
  );

  return overloads.join("\n");
}
