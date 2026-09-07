import assert from "assert";
import { type ClassExpression, Node, type SourceFile, SyntaxKind } from "ts-morph";
import type { ConstructorSpecification } from "~/compiler/specifications";

export function resolveFacadeConstructor(
  expression: ClassExpression,
  file: SourceFile,
  hasFactory: boolean,
): ConstructorSpecification {
  const constructor =
    expression.getConstructors().find((item) => item.getBody()) ??
    expression.getConstructors().at(0);

  assert(
    constructor,
    `${file.getFilePath()}: facade class must declare a constructor`,
  );

  const parameters = constructor.getParameters();

  if (hasFactory) {
    for (const parameter of parameters) {
      assert(
        Node.isIdentifier(parameter.getNameNode()),
        `${file.getFilePath()}: facade factory constructors must use identifier parameters`,
      );
    }
  }

  const referencedDeclarations = new Set(
    parameters
      .flatMap((parameter) =>
        parameter.getDescendantsOfKind(SyntaxKind.Identifier),
      )
      .flatMap((identifier) => identifier.getSymbol()?.getDeclarations() ?? [])
      .map((declaration) => declaration.compilerNode),
  );
  const typeParameters = expression.getTypeParameters();
  const lastRequiredIndex = typeParameters.reduce(
    (lastIndex, parameter, index) =>
      referencedDeclarations.has(parameter.compilerNode) ||
      !parameter.getDefault()
        ? index
        : lastIndex,
    -1,
  );
  const factoryTypeParameters = typeParameters.slice(0, lastRequiredIndex + 1);

  return {
    arguments: parameters.map(
      (parameter) =>
        `${parameter.isRestParameter() ? "..." : ""}${parameter.getName()}`,
    ),
    parameters: parameters.map((parameter) => {
      const type = parameter.getTypeNode()?.getText() ?? "unknown";
      const initializer = parameter.getInitializer()?.getText();

      return `${parameter.isRestParameter() ? "..." : ""}${parameter.getName()}${parameter.hasQuestionToken() ? "?" : ""}: ${type}${initializer ? ` = ${initializer}` : ""}`;
    }),
    typeParameterNames: factoryTypeParameters.map((parameter) =>
      parameter.getName(),
    ),
    typeParameters: factoryTypeParameters.map((parameter) =>
      parameter.getText(),
    ),
  };
}
