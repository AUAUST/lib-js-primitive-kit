import type { ClassExpression } from "ts-morph";

export function renderFacadeClassDeclaration(
  expression: ClassExpression,
  name: string,
): string {
  const lines = expression.getText().split("\n");

  const nestedIndent = Math.min(
    ...lines
      .slice(1)
      .filter((line) => line.trim())
      .map((line) => line.match(/^\s*/)?.[0].length ?? 0),
  );

  return lines
    .map((line, index) => (index === 0 ? line : line.slice(nestedIndent)))
    .join("\n")
    .replace(/^class(?=\s*(?:<|extends|\{))/, `class ${name}`);
}
