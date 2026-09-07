import assert from "assert";
import { Node, type ObjectLiteralExpression, type SourceFile } from "ts-morph";
import { getProperty } from "~/compiler/getProperty";
import type { InstanceCallable } from "~/compiler/specifications";

export function resolveInstanceCallable(
  file: SourceFile,
  argument: ObjectLiteralExpression,
): InstanceCallable {
  const expression = getProperty(argument, "instanceCallable", file);

  if (!expression || Node.isFalseLiteral(expression)) {
    return false;
  }

  if (Node.isTrueLiteral(expression)) {
    return true;
  }

  assert(
    Node.isStringLiteral(expression) &&
      expression.getLiteralValue() === "chainable",
    `${file.getFilePath()}: instanceCallable must be true, false, or "chainable"`,
  );

  return "chainable";
}
