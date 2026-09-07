import {
  type FunctionDeclaration,
  Node,
  type SourceFile,
  SyntaxKind,
} from "ts-morph";
import type {
  InstanceSignatureImportSpecification,
  InstanceSignatureSpecification,
} from "~/compiler/specifications";
import { withoutExtension } from "~/compiler/withoutExtension";

export function resolveSignatureImports(
  signatures: FunctionDeclaration[],
  file: SourceFile,
): Pick<InstanceSignatureSpecification, "declarations" | "imports"> {
  const referencedNodes = signatures.flatMap((signature) => {
    const firstParameterType = signature.getParameters().at(0)?.getTypeNode();

    const boundTypeParameter = signature
      .getTypeParameters()
      .find(
        (parameter) => firstParameterType?.getText() === parameter.getName(),
      );

    const nodes: Node[] = [
      ...signature
        .getTypeParameters()
        .filter((parameter) => parameter !== boundTypeParameter),
      ...signature.getParameters().slice(1),
    ];

    const returnType = signature.getReturnTypeNode();

    if (returnType) {
      nodes.push(returnType);
    }

    return nodes;
  });

  const referenced = referencedNodes
    .flatMap((node) => node.getDescendantsOfKind(SyntaxKind.Identifier))
    .flatMap((identifier) => identifier.getSymbol()?.getDeclarations() ?? []);

  const referencedDeclarations = new Set<Node["compilerNode"]>();

  const declarations: string[] = [];

  const imports: InstanceSignatureImportSpecification[] = [];

  for (const declaration of referenced) {
    if (referencedDeclarations.has(declaration.compilerNode)) {
      continue;
    }

    referencedDeclarations.add(declaration.compilerNode);

    if (
      declaration.getSourceFile() !== file ||
      !(
        Node.isTypeAliasDeclaration(declaration) ||
        Node.isInterfaceDeclaration(declaration) ||
        Node.isClassDeclaration(declaration) ||
        Node.isEnumDeclaration(declaration)
      )
    ) {
      continue;
    }

    const name = declaration.getName()!;

    if (declaration.isExported()) {
      imports.push({
        filename: withoutExtension(file),
        kind: "named",
        localName: name,
        moduleSpecifier: file.getFilePath(),
        name,
      });
    } else {
      declarations.push(declaration.getText());
      referenced.push(
        ...declaration
          .getDescendantsOfKind(SyntaxKind.Identifier)
          .flatMap(
            (identifier) => identifier.getSymbol()?.getDeclarations() ?? [],
          ),
      );
    }
  }

  const isUsed = (
    binding: Node & { getSymbol(): import("ts-morph").Symbol | undefined },
  ) =>
    binding
      .getSymbol()
      ?.getDeclarations()
      .some((declaration) =>
        referencedDeclarations.has(declaration.compilerNode),
      ) ?? false;

  for (const importDeclaration of file.getImportDeclarations()) {
    const moduleSpecifier = importDeclaration.getModuleSpecifierValue();

    const importedFile = importDeclaration.getModuleSpecifierSourceFile();

    const filename = importedFile && withoutExtension(importedFile);

    const defaultImport = importDeclaration.getDefaultImport();

    const namespaceImport = importDeclaration.getNamespaceImport();

    if (defaultImport && isUsed(defaultImport)) {
      imports.push({
        filename,
        kind: "default",
        localName: defaultImport.getText(),
        moduleSpecifier,
        name: "default",
      });
    }

    if (namespaceImport && isUsed(namespaceImport)) {
      imports.push({
        filename,
        kind: "namespace",
        localName: namespaceImport.getText(),
        moduleSpecifier,
        name: "*",
      });
    }

    for (const namedImport of importDeclaration.getNamedImports()) {
      const localName =
        namedImport.getAliasNode()?.getText() ?? namedImport.getName();

      const localBinding =
        namedImport.getAliasNode() ?? namedImport.getNameNode();

      if (!isUsed(localBinding)) continue;

      imports.push({
        filename,
        kind: "named",
        localName,
        moduleSpecifier,
        name: namedImport.getName(),
      });
    }
  }

  return { declarations, imports };
}
