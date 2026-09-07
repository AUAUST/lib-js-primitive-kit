import assert from "assert";
import { Node, type SourceFile } from "ts-morph";
import { getJSDocs } from "~/compiler/getJSDocs";
import { getNamedExport } from "~/compiler/getNamedExport";
import { getStringArray } from "~/compiler/getProperty";
import { resolveInstanceCallable } from "~/compiler/resolveInstanceCallable";
import { resolveInstanceSignature } from "~/compiler/resolveInstanceSignature";
import type { MethodSpecification } from "~/compiler/specifications";
import { withoutExtension } from "~/compiler/withoutExtension";

export function resolveMethodDefinition(file: SourceFile): MethodSpecification {
  const name = file.getBaseNameWithoutExtension();
  const filename = withoutExtension(file);
  const { declarations } = getNamedExport(file, name);

  assert(
    declarations.length > 0,
    `${file.getFilePath()}: expected an export named ${JSON.stringify(name)}`,
  );

  const documentation = declarations.flatMap(getJSDocs).filter(Boolean);
  const defaultExport = file
    .getExportAssignments()
    .find((assignment) => !assignment.isExportEquals());

  if (!defaultExport) {
    return {
      name,
      filename,
      methodAliases: [],
      helperAliases: [],
      instanceCallable: false,
      instanceSignature: undefined,
      documentation,
    };
  }

  const expression = defaultExport.getExpression();

  assert(
    Node.isCallExpression(expression),
    `${file.getFilePath()}: expected export default defineMethod(...)`,
  );
  assert(
    Node.isIdentifier(expression.getExpression()) &&
      expression.getExpression().getText() === "defineMethod",
    `${file.getFilePath()}: expected export default defineMethod(...)`,
  );

  const [argument] = expression.getArguments();

  assert(
    Node.isObjectLiteralExpression(argument),
    `${file.getFilePath()}: defineMethod() expects an object literal`,
  );

  const instanceCallable = resolveInstanceCallable(file, argument);

  return {
    name,
    filename,
    methodAliases: getStringArray(argument, "methodAliases", file) ?? [],
    helperAliases: getStringArray(argument, "helperAliases", file) ?? [],
    instanceCallable,
    instanceSignature: instanceCallable
      ? resolveInstanceSignature(declarations, file)
      : undefined,
    documentation,
  };
}
