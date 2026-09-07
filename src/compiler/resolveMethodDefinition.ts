import assert from "assert";
import {
  type JSDoc,
  Node,
  type FunctionDeclaration,
  type SourceFile,
  SyntaxKind,
} from "ts-morph";
import { getJSDocs } from "~/compiler/getJSDocs";
import { getNamedExport } from "~/compiler/getNamedExport";
import { getProperty, getStringArray } from "~/compiler/getProperty";

export type InstanceCallable = false | true | "chainable";

export type InstanceSignatureSpecification = {
  declarations: string[];
  imports: InstanceSignatureImportSpecification[];
  overloads: InstanceOverloadSpecification[];
};

export type InstanceOverloadSpecification = {
  boundTypeParameter: string | undefined;
  firstParameterName: string;
  parameters: string[];
  returnType: string;
  typeParameterNames: string[];
  typeParameters: string[];
};

export type InstanceSignatureImportSpecification = {
  filename: string | undefined;
  kind: "default" | "named" | "namespace";
  localName: string;
  moduleSpecifier: string;
  name: string;
};

export type MethodSpecification = {
  name: string;
  filename: string;
  methodAliases: string[];
  helperAliases: string[];
  instanceCallable: InstanceCallable;
  instanceSignature: InstanceSignatureSpecification | undefined;
  documentation: JSDoc[];
};

function resolveInstanceCallable(
  file: SourceFile,
  argument: Parameters<typeof getProperty>[0],
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

function resolveSignatureImports(
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

    if (returnType) nodes.push(returnType);

    return nodes;
  });

  const referenced = referencedNodes
    .flatMap((node) => node.getDescendantsOfKind(SyntaxKind.Identifier))
    .flatMap((identifier) => identifier.getSymbol()?.getDeclarations() ?? []);

  const referencedDeclarations = new Set<Node["compilerNode"]>();
  const declarations: string[] = [];
  const imports: InstanceSignatureImportSpecification[] = [];

  for (const declaration of referenced) {
    if (referencedDeclarations.has(declaration.compilerNode)) continue;

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
        filename: file
          .getFilePath()
          .replace(
            new RegExp(`${file.getExtension().replace(".", "\\.")}$`),
            "",
          ),
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
    binding: Node & {
      getSymbol(): import("ts-morph").Symbol | undefined;
    },
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
    const filename = importedFile
      ?.getFilePath()
      .replace(
        new RegExp(`${importedFile.getExtension().replace(".", "\\.")}$`),
        "",
      );
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

      if (!isUsed(localBinding)) {
        continue;
      }

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

function resolveInstanceSignature(
  declarations: Node[],
  file: SourceFile,
): InstanceSignatureSpecification | undefined {
  const functions = declarations.filter(Node.isFunctionDeclaration);

  const overloads = functions.filter((declaration) => !declaration.getBody());
  const signatures = overloads.length ? overloads : functions;

  if (!signatures.length) {
    return undefined;
  }

  return {
    ...resolveSignatureImports(signatures, file),
    overloads: signatures.map((signature) => {
      const typeParameters = signature.getTypeParameters();
      const firstParameterType = signature.getParameters().at(0)?.getTypeNode();
      const boundTypeParameter = typeParameters
        .find(
          (parameter) => firstParameterType?.getText() === parameter.getName(),
        )
        ?.getName();

      return {
        boundTypeParameter,
        firstParameterName: signature.getParameters().at(0)?.getName() ?? "",
        parameters: signature
          .getParameters()
          .slice(1)
          .map((parameter) => {
            const optional =
              parameter.hasQuestionToken() || parameter.getInitializer();
            const type =
              parameter.getTypeNode()?.getText() ??
              parameter.getType().getText(parameter);

            return `${
              parameter.isRestParameter() ? "..." : ""
            }${parameter.getName()}${optional ? "?" : ""}: ${type}`;
          }),
        returnType:
          signature.getReturnTypeNode()?.getText() ??
          signature.getReturnType().getText(signature),
        typeParameterNames: typeParameters.map((parameter) =>
          parameter.getName(),
        ),
        typeParameters: typeParameters.map((parameter) => parameter.getText()),
      };
    }),
  };
}

export function resolveMethodDefinition(file: SourceFile): MethodSpecification {
  const name = file.getBaseNameWithoutExtension();

  const filename = file
    .getFilePath()
    .replace(new RegExp(file.getExtension().replace(".", "\\.") + "$"), "");

  const { declarations } = getNamedExport(file, name);

  assert(
    declarations.length > 0,
    `${file.getFilePath()}: expected an export named ${JSON.stringify(name)}`,
  );

  const documentation = declarations.flatMap(getJSDocs).filter(Boolean);

  const defaultExport = file
    .getExportAssignments()
    .find((assignment) => !assignment.isExportEquals());

  if (defaultExport) {
    const expression = defaultExport.getExpression();

    assert(
      Node.isCallExpression(expression),
      `${file.getFilePath()}: expected export default defineMethod(...)`,
    );

    const callee = expression.getExpression();

    assert(
      Node.isIdentifier(callee) && callee.getText() === "defineMethod",
      `${file.getFilePath()}: expected export default defineMethod(...)`,
    );

    const [argument] = expression.getArguments();

    assert(
      Node.isObjectLiteralExpression(argument),
      `${file.getFilePath()}: defineMethod() expects an object literal`,
    );

    const instanceCallable = resolveInstanceCallable(file, argument);

    return {
      name,
      filename,
      methodAliases: getStringArray(argument, "methodAliases", file) ?? [],
      helperAliases: getStringArray(argument, "helperAliases", file) ?? [],
      instanceCallable,
      instanceSignature: instanceCallable
        ? resolveInstanceSignature(declarations, file)
        : undefined,
      documentation,
    };
  }

  return {
    name,
    filename,
    methodAliases: [],
    helperAliases: [],
    instanceCallable: false,
    instanceSignature: undefined,
    documentation,
  };
}
