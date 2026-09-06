import { Node, type SourceFile } from "ts-morph";

export type TypeExportSpecification = {
  name: string;
  filename: string;
};

/**
 * Resolves the type-only symbols exported by a source file.
 */
export function resolveTypeDefinitions(
  file: SourceFile,
): TypeExportSpecification[] {
  const filename = file
    .getFilePath()
    .replace(new RegExp(`${file.getExtension().replace(".", "\\.")}$`), "");

  return file
    .getExportSymbols()
    .filter((exportSymbol) => {
      const symbol = exportSymbol.getAliasedSymbol() ?? exportSymbol;

      return symbol
        .getDeclarations()
        .some(
          (declaration) =>
            Node.isInterfaceDeclaration(declaration) ||
            Node.isTypeAliasDeclaration(declaration),
        );
    })
    .map((symbol) => ({
      name: symbol.getName(),
      filename,
    }));
}
