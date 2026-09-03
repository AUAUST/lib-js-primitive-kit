import assert from "assert";
import { Expression, JSDoc, Node, SourceFile } from "ts-morph";
import { getJSDocs } from "~/compiler/getJSDocs";
import {
  getBoolean,
  getProperty,
  getRawString,
  getString,
  getStringArray,
} from "~/compiler/getProperty";

export type ImportSpecification = {
  name: string;
  filename: string;
};

export type FacadeSpecification = {
  name: string;
  extends: string | undefined;
  aliases: string[];
  instantiable: boolean;
  callable: ImportSpecification | undefined;
  documentation: JSDoc[];
};

function resolveImport(
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
    .find(
      (exportSymbol) =>
        (exportSymbol.getAliasedSymbol() ?? exportSymbol) === symbol,
    );

  assert(
    exportSymbol,
    `${file.getFilePath()}: callable ${expression.getText()} must be exported from ${sourceFile.getFilePath()}`,
  );

  return {
    name: exportSymbol.getName(),
    filename: sourceFile
      .getFilePath()
      .replace(new RegExp(`${sourceFile.getExtension().replace(".", "\\.")}$`), ""),
  };
}

export function resolveFacadeDefinition(file: SourceFile): FacadeSpecification {
  const defaultExport = file
    .getExportAssignments()
    .find((assignment) => !assignment.isExportEquals());

  assert(defaultExport, `${file.getFilePath()}: expected a default export`);

  const expression = defaultExport.getExpression();

  assert(
    Node.isCallExpression(expression),
    `${file.getFilePath()}: expected export default defineFacade(...)`,
  );

  const callee = expression.getExpression();

  assert(
    Node.isIdentifier(callee) && callee.getText() === "defineFacade",
    `${file.getFilePath()}: expected export default defineFacade(...)`,
  );

  const [argument] = expression.getArguments();

  assert(
    Node.isObjectLiteralExpression(argument),
    `${file.getFilePath()}: defineFacade() expects an object literal`,
  );

  const name = getString(argument, "name", file);

  assert(
    name,
    `${file.getFilePath()}: defineFacade() requires a "name" property`,
  );

  const callable = getProperty(argument, "callable", file);

  return {
    name,
    extends: getRawString(argument, "extends", file),
    aliases: getStringArray(argument, "aliases", file) ?? [],
    instantiable: getBoolean(argument, "instantiable", file) ?? false,
    callable: callable ? resolveImport(callable, file) : undefined,
    documentation: getJSDocs(defaultExport),
  };
}
