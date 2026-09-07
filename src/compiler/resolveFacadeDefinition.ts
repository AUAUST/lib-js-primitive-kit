import assert from "assert";
import { Node, type SourceFile } from "ts-morph";
import { getProperty, getString, getStringArray } from "~/compiler/getProperty";
import { resolveFacadeClass } from "~/compiler/resolveFacadeClass";
import { resolveImportedCallable } from "~/compiler/resolveImportedCallable";
import type { FacadeSpecification } from "~/compiler/specifications";

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
  assert(
    Node.isIdentifier(expression.getExpression()) &&
      expression.getExpression().getText() === "defineFacade",
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
  const factory = getString(argument, "factory", file);
  const facadeClass = getProperty(argument, "class", file);

  assert(
    facadeClass,
    `${file.getFilePath()}: defineFacade() requires a "class" property`,
  );

  return {
    name,
    factory,
    class: resolveFacadeClass(facadeClass, file, name, factory !== undefined),
    aliases: getStringArray(argument, "aliases", file) ?? [],
    callable: callable ? resolveImportedCallable(callable, file) : undefined,
  };
}
