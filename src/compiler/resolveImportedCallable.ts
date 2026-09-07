import assert from "assert";
import { type Expression, Node, type SourceFile } from "ts-morph";
import type { ImportSpecification } from "~/compiler/specifications";
import { withoutExtension } from "~/compiler/withoutExtension";

export function resolveImportedCallable(
  expression: Expression,
  file: SourceFile,
): ImportSpecification {
  assert(
    Node.isIdentifier(expression),
    `${file.getFilePath()}: callable must be an imported function reference`,
  );

  assert(
    expression.getType().getCallSignatures().length > 0,
    `${file.getFilePath()}: callable ${expression.getText()} does not have a call signature`,
  );

  const referenceSymbol = expression.getSymbol();

  assert(
    referenceSymbol,
    `${file.getFilePath()}: could not resolve callable ${expression.getText()}`,
  );

  const symbol = referenceSymbol.getAliasedSymbol() ?? referenceSymbol;

  const declaration = symbol
    .getDeclarations()
    .find(
      (declaration) =>
        Node.isFunctionDeclaration(declaration) ||
        Node.isVariableDeclaration(declaration),
    );

  assert(
    declaration,
    `${file.getFilePath()}: callable ${expression.getText()} must resolve to a function or variable declaration`,
  );

  const sourceFile = declaration.getSourceFile();

  const exportSymbol = sourceFile
    .getExportSymbols()
    .find((candidate) =>
      (candidate.getAliasedSymbol() ?? candidate)
        .getDeclarations()
        .some((item) => item.compilerNode === declaration.compilerNode),
    );

  assert(
    exportSymbol,
    `${file.getFilePath()}: callable ${expression.getText()} must be exported from ${sourceFile.getFilePath()}`,
  );

  return {
    name: exportSymbol.getName(),
    filename: withoutExtension(sourceFile),
  };
}
