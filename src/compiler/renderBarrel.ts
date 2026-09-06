import { type ExportDefinition, renderExports } from "~/compiler/renderExports";

export function renderBarrel(
  exports: ExportDefinition[],
  base: string,
): string {
  return (
    (
      `// This file is generated. Do not edit it directly.\n\n` +
      renderExports(exports, base)
    ).trimEnd() + "\n"
  );
}
