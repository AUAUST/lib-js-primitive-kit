import assert from "assert";
import {
  type Expression,
  type JSDoc,
  Node,
  type SourceFile,
  SyntaxKind,
} from "ts-morph";
import { getJSDocs } from "~/compiler/getJSDocs";
import { getProperty, getString, getStringArray } from "~/compiler/getProperty";

export type ImportSpecification = {
  name: string;
  filename: string;
};

export type ClassSpecification = {
  code: string;
  constructor: ConstructorSpecification;
  declarationTypeParameters: string[];
  imports: ClassImportSpecification[];
  name: string;
  typeParameterNames: string[];
  typeParameters: string[];
  inputTypeParameter: string | undefined;
  valueTypeParameter: string | undefined;
};

export type ConstructorSpecification = {
  arguments: string[];
  parameters: string[];
  typeParameterNames: string[];
  typeParameters: string[];
};

export type ClassImportSpecification = {
  filename: string | undefined;
  isType: boolean;
  kind: "default" | "named" | "namespace";
  localName: string;
  moduleSpecifier: string;
  name: string;
};

export type FacadeSpecification = {
  name: string;
  factory: string | undefined;
  class: ClassSpecification;
  aliases: string[];
  callable: ImportSpecification | undefined;
  documentation: JSDoc[];
};

function resolveClass(
  expression: Expression,
  file: SourceFile,
  facadeName: string,
  hasFactory: boolean,
): ClassSpecification {
  assert(
    Node.isClassExpression(expression),
    `${file.getFilePath()}: class must be an anonymous class expression`,
  );

  assert(
    !expression.getName(),
    `${file.getFilePath()}: facade class expressions must be anonymous; the compiler derives their name from ${JSON.stringify(
      facadeName,
    )}`,
  );

  const typeParameters = expression.getTypeParameters();

  const constructor =
    expression.getConstructors().find((declaration) => declaration.getBody()) ??
    expression.getConstructors().at(0);

  assert(
    constructor,
    `${file.getFilePath()}: facade class must declare a constructor`,
  );

  const constructorParameters = constructor.getParameters();

  if (hasFactory) {
    for (const parameter of constructorParameters) {
      assert(
        Node.isIdentifier(parameter.getNameNode()),
        `${file.getFilePath()}: facade factory constructors must use identifier parameters`,
      );
    }
  }

  const referencedTypeParameterDeclarations = new Set(
    constructorParameters
      .flatMap((parameter) =>
        parameter.getDescendantsOfKind(SyntaxKind.Identifier),
      )
      .flatMap((identifier) => identifier.getSymbol()?.getDeclarations() ?? [])
      .map((declaration) => declaration.compilerNode),
  );

  const lastFactoryTypeParameterIndex = typeParameters.reduce(
    (lastIndex, parameter, index) =>
      referencedTypeParameterDeclarations.has(parameter.compilerNode) ||
      !parameter.getDefault()
        ? index
        : lastIndex,
    -1,
  );

  const factoryTypeParameters = typeParameters.slice(
    0,
    lastFactoryTypeParameterIndex + 1,
  );

  const referencedDeclarations = new Set(
    expression
      .getDescendantsOfKind(SyntaxKind.Identifier)
      .flatMap((identifier) => identifier.getSymbol()?.getDeclarations() ?? [])
      .map((referencedDeclaration) => referencedDeclaration.compilerNode),
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

  for (const importDeclaration of file.getImportDeclarations()) {
    const moduleSpecifier = importDeclaration.getModuleSpecifierValue();

    const importedFile = importDeclaration.getModuleSpecifierSourceFile();

    const filename = importedFile
      ?.getFilePath()
      .replace(
        new RegExp(`${importedFile.getExtension().replace(".", "\\.")}$`),
        "",
      );

    const isTypeOnly = importDeclaration.isTypeOnly();

    const defaultImport = importDeclaration.getDefaultImport();

    const namespaceImport = importDeclaration.getNamespaceImport();

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

    for (const namedImport of importDeclaration.getNamedImports()) {
      const localName =
        namedImport.getAliasNode()?.getText() ?? namedImport.getName();

      const localBinding =
        namedImport.getAliasNode() ?? namedImport.getNameNode();

      if (!isUsed(localBinding)) continue;

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

  const classLines = expression.getText().split("\n");

  const nestedIndent = Math.min(
    ...classLines
      .slice(1)
      .filter((line) => line.trim())
      .map((line) => line.match(/^\s*/)?.[0].length ?? 0),
  );

  const classDeclaration = classLines
    .map((line, index) => (index === 0 ? line : line.slice(nestedIndent)))
    .join("\n")
    .replace(/^class(?=\s*(?:<|extends|\{))/, `class ${facadeName}`);

  return {
    name: facadeName,
    code: classDeclaration,
    constructor: {
      arguments: constructorParameters.map(
        (parameter) =>
          `${parameter.isRestParameter() ? "..." : ""}${parameter.getName()}`,
      ),
      parameters: constructorParameters.map((parameter) => {
        const type = parameter.getTypeNode()?.getText() ?? "unknown";
        const initializer = parameter.getInitializer()?.getText();

        return `${
          parameter.isRestParameter() ? "..." : ""
        }${parameter.getName()}${
          parameter.hasQuestionToken() ? "?" : ""
        }: ${type}${initializer ? ` = ${initializer}` : ""}`;
      }),
      typeParameterNames: factoryTypeParameters.map((parameter) =>
        parameter.getName(),
      ),
      typeParameters: factoryTypeParameters.map((parameter) =>
        parameter.getText(),
      ),
    },
    declarationTypeParameters: typeParameters.map((parameter) =>
      parameter.getText(),
    ),
    imports,
    typeParameters: typeParameters.map((parameter) =>
      parameter.getText().replace(/^const\s+/, ""),
    ),
    typeParameterNames: typeParameters.map((parameter) => parameter.getName()),
    inputTypeParameter: typeParameters.at(0)?.getName(),
    valueTypeParameter: typeParameters.at(1)?.getName(),
  };
}

function resolveImport(
  expression: Expression,
  file: SourceFile,
): ImportSpecification {
  assert(
    Node.isIdentifier(expression),
    `${file.getFilePath()}: callable must be an imported function reference`,
  );

  assert(
    expression.getType().getCallSignatures().length > 0,
    `${file.getFilePath()}: callable ${expression.getText()} does not have a call signature`,
  );

  const referenceSymbol = expression.getSymbol();

  assert(
    referenceSymbol,
    `${file.getFilePath()}: could not resolve callable ${expression.getText()}`,
  );

  const symbol = referenceSymbol.getAliasedSymbol() ?? referenceSymbol;

  const declaration = symbol
    .getDeclarations()
    .find(
      (declaration) =>
        Node.isFunctionDeclaration(declaration) ||
        Node.isVariableDeclaration(declaration),
    );

  assert(
    declaration,
    `${file.getFilePath()}: callable ${expression.getText()} must resolve to a function or variable declaration`,
  );

  const sourceFile = declaration.getSourceFile();

  const exportSymbol = sourceFile
    .getExportSymbols()
    .find((exportSymbol) =>
      (exportSymbol.getAliasedSymbol() ?? exportSymbol)
        .getDeclarations()
        .some(
          (exportDeclaration) =>
            exportDeclaration.compilerNode === declaration.compilerNode,
        ),
    );

  assert(
    exportSymbol,
    `${file.getFilePath()}: callable ${expression.getText()} must be exported from ${sourceFile.getFilePath()}`,
  );

  return {
    name: exportSymbol.getName(),
    filename: sourceFile
      .getFilePath()
      .replace(
        new RegExp(`${sourceFile.getExtension().replace(".", "\\.")}$`),
        "",
      ),
  };
}

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

  const callee = expression.getExpression();

  assert(
    Node.isIdentifier(callee) && callee.getText() === "defineFacade",
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
    class: resolveClass(facadeClass, file, name, factory !== undefined),
    aliases: getStringArray(argument, "aliases", file) ?? [],
    callable: callable ? resolveImport(callable, file) : undefined,
    documentation: getJSDocs(defaultExport),
  };
}
