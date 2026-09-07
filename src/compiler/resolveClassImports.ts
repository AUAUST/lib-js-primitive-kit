import { type ClassExpression, Node, type SourceFile, SyntaxKind } from "ts-morph";
import type { ClassImportSpecification } from "~/compiler/specifications";
import { withoutExtension } from "~/compiler/withoutExtension";

export function resolveClassImports(
  expression: ClassExpression,
  file: SourceFile,
): ClassImportSpecification[] {
  const referencedDeclarations = new Set(
    expression
      .getDescendantsOfKind(SyntaxKind.Identifier)
      .flatMap((identifier) => identifier.getSymbol()?.getDeclarations() ?? [])
      .map((declaration) => declaration.compilerNode),
  );
  const imports: ClassImportSpecification[] = [];
  const isUsed = (
    identifier: Node & { getSymbol(): import("ts-morph").Symbol | undefined },
  ) =>
    identifier
      .getSymbol()
      ?.getDeclarations()
      .some((binding) => referencedDeclarations.has(binding.compilerNode)) ??
    false;

  for (const declaration of file.getImportDeclarations()) {
    const moduleSpecifier = declaration.getModuleSpecifierValue();
    const importedFile = declaration.getModuleSpecifierSourceFile();
    const filename = importedFile && withoutExtension(importedFile);
    const isTypeOnly = declaration.isTypeOnly();
    const defaultImport = declaration.getDefaultImport();
    const namespaceImport = declaration.getNamespaceImport();

    if (defaultImport && isUsed(defaultImport)) {
      imports.push({
        filename,
        isType: isTypeOnly,
        kind: "default",
        localName: defaultImport.getText(),
        moduleSpecifier,
        name: "default",
      });
    }

    if (namespaceImport && isUsed(namespaceImport)) {
      imports.push({
        filename,
        isType: isTypeOnly,
        kind: "namespace",
        localName: namespaceImport.getText(),
        moduleSpecifier,
        name: "*",
      });
    }

    for (const namedImport of declaration.getNamedImports()) {
      const localName =
        namedImport.getAliasNode()?.getText() ?? namedImport.getName();
      const binding = namedImport.getAliasNode() ?? namedImport.getNameNode();

      if (!isUsed(binding)) continue;

      imports.push({
        filename,
        isType: isTypeOnly || namedImport.isTypeOnly(),
        kind: "named",
        localName,
        moduleSpecifier,
        name: namedImport.getName(),
      });
    }
  }

  return imports;
}
