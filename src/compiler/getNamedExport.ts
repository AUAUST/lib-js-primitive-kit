import assert from "node:assert";
import { type SourceFile } from "ts-morph";

export function getNamedExport(
  file: SourceFile,
  name = file.getBaseNameWithoutExtension(),
) {
  const exportSymbol = file
    .getExportSymbols()
    .find((symbol) => symbol.getName() === name);

  assert(
    exportSymbol,
    `${file.getFilePath()}: expected an export named ${JSON.stringify(name)}`,
  );

  const symbol = exportSymbol.getAliasedSymbol() ?? exportSymbol;

  return {
    symbol,
    declarations: symbol.getDeclarations(),
  };
}
