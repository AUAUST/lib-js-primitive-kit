import assert from "assert";
import { type Expression, Node, type SourceFile } from "ts-morph";
import { renderFacadeClassDeclaration } from "~/compiler/renderFacadeClassDeclaration";
import { resolveClassImports } from "~/compiler/resolveClassImports";
import { resolveFacadeConstructor } from "~/compiler/resolveFacadeConstructor";
import type { ClassSpecification } from "~/compiler/specifications";

export function resolveFacadeClass(
  expression: Expression,
  file: SourceFile,
  facadeName: string,
  hasFactory: boolean,
): ClassSpecification {
  assert(
    Node.isClassExpression(expression),
    `${file.getFilePath()}: class must be an anonymous class expression`,
  );

  assert(
    !expression.getName(),
    `${file.getFilePath()}: facade class expressions must be anonymous; the compiler derives their name from ${JSON.stringify(facadeName)}`,
  );

  const typeParameters = expression.getTypeParameters();

  return {
    callable: expression.getExtends()?.getText() === "Function",
    name: facadeName,
    code: renderFacadeClassDeclaration(expression, facadeName),
    constructor: resolveFacadeConstructor(expression, file, hasFactory),
    declarationTypeParameters: typeParameters.map((parameter) =>
      parameter.getText(),
    ),
    imports: resolveClassImports(expression, file),
    typeParameters: typeParameters.map((parameter) =>
      parameter.getText().replace(/^const\s+/, ""),
    ),
    typeParameterNames: typeParameters.map((parameter) => parameter.getName()),
    inputTypeParameter: typeParameters.at(0)?.getName(),
    valueTypeParameter: typeParameters.at(1)?.getName(),
  };
}
