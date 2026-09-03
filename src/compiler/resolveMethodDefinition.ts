import assert from "assert";
import { JSDoc, Node, SourceFile } from "ts-morph";
import { getJSDocs } from "~/compiler/getJSDocs";
import { getNamedExport } from "~/compiler/getNamedExport";
import { getBoolean, getStringArray } from "~/compiler/getProperty";

export type MethodSpecification = {
  name: string;
  filename: string;
  staticAliases: string[];
  helperAliases: string[];
  instanceCallable: boolean;
  documentation: JSDoc[];
};

export function resolveMethodDefinition(file: SourceFile): MethodSpecification {
  const name = file.getBaseNameWithoutExtension();

  const filename = file
    .getFilePath()
    .replace(new RegExp(file.getExtension().replace(".", "\\.") + "$"), "");

  const { declarations } = getNamedExport(file, name);

  assert(
    declarations.length > 0,
    `${file.getFilePath()}: expected an export named ${JSON.stringify(name)}`,
  );

  const documentation = declarations.flatMap(getJSDocs).filter(Boolean);

  const defaultExport = file
    .getExportAssignments()
    .find((assignment) => !assignment.isExportEquals());

  if (defaultExport) {
    const expression = defaultExport.getExpression();

    assert(
      Node.isCallExpression(expression),
      `${file.getFilePath()}: expected export default defineMethod(...)`,
    );

    const callee = expression.getExpression();

    assert(
      Node.isIdentifier(callee) && callee.getText() === "defineMethod",
      `${file.getFilePath()}: expected export default defineMethod(...)`,
    );

    const [argument] = expression.getArguments();

    assert(
      Node.isObjectLiteralExpression(argument),
      `${file.getFilePath()}: defineMethod() expects an object literal`,
    );

    return {
      name,
      filename,
      staticAliases: getStringArray(argument, "staticAliases", file) ?? [],
      helperAliases: getStringArray(argument, "helperAliases", file) ?? [],
      instanceCallable: getBoolean(argument, "instanceCallable", file) ?? false,
      documentation,
    };
  }

  return {
    name,
    filename,
    staticAliases: [],
    helperAliases: [],
    instanceCallable: false,
    documentation,
  };
}
