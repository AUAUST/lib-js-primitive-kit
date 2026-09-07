import { Node, type SourceFile } from "ts-morph";
import { resolveSignatureImports } from "~/compiler/resolveSignatureImports";
import type { InstanceSignatureSpecification } from "~/compiler/specifications";

export function resolveInstanceSignature(
  declarations: Node[],
  file: SourceFile,
): InstanceSignatureSpecification | undefined {
  const functions = declarations.filter(Node.isFunctionDeclaration);
  const overloads = functions.filter((declaration) => !declaration.getBody());
  const signatures = overloads.length ? overloads : functions;

  if (!signatures.length) return undefined;

  return {
    ...resolveSignatureImports(signatures, file),
    overloads: signatures.map((signature) => {
      const typeParameters = signature.getTypeParameters();
      const firstParameterType = signature.getParameters().at(0)?.getTypeNode();
      const boundTypeParameter = typeParameters
        .find(
          (parameter) => firstParameterType?.getText() === parameter.getName(),
        )
        ?.getName();

      return {
        boundTypeParameter,
        firstParameterName: signature.getParameters().at(0)?.getName() ?? "",
        parameters: signature
          .getParameters()
          .slice(1)
          .map((parameter) => {
            const optional =
              parameter.hasQuestionToken() || parameter.getInitializer();
            const type =
              parameter.getTypeNode()?.getText() ??
              parameter.getType().getText(parameter);

            return `${parameter.isRestParameter() ? "..." : ""}${parameter.getName()}${optional ? "?" : ""}: ${type}`;
          }),
        returnType:
          signature.getReturnTypeNode()?.getText() ??
          signature.getReturnType().getText(signature),
        typeParameterNames: typeParameters.map((parameter) =>
          parameter.getName(),
        ),
        typeParameters: typeParameters.map((parameter) => parameter.getText()),
      };
    }),
  };
}
