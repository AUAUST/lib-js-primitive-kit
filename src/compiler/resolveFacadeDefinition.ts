import assert from "assert";
import { JSDoc, Node, SourceFile } from "ts-morph";
import { getJSDocs } from "~/compiler/getJSDocs";
import { getBoolean, getString, getStringArray } from "~/compiler/getProperty";

export type FacadeDefinition = {
  name: string;
  aliases: string[];
  instantiable: boolean;
  callable: boolean;
  documentation: JSDoc[];
};

export function resolveFacadeDefinition(file: SourceFile): FacadeDefinition {
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

  return {
    name,
    aliases: getStringArray(argument, "aliases", file) ?? [],
    instantiable: getBoolean(argument, "instantiable", file) ?? false,
    callable: getBoolean(argument, "callable", file) ?? false,
    documentation: getJSDocs(defaultExport),
  };
}
