export function renderMethodRecord(name: string, lines: string[]): string {
  return `const ${name} = {${lines.length ? `\n  ${lines.join("\n  ")}\n` : ""}};`;
}
