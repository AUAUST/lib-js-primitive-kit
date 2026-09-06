import assert from "assert";
import { JSDoc, Node, SourceFile } from "ts-morph";
import { getJSDocs } from "~/compiler/getJSDocs";
import { getNamedExport } from "~/compiler/getNamedExport";
import { getProperty, getStringArray } from "~/compiler/getProperty";

export type InstanceCallable = false | true | "chainable";

export type InstanceSignatureSpecification = {
  boundTypeParameter: string | undefined;
  typeParameterNames: string[];
  typeParameters: string[];
};

export type MethodSpecification = {
  name: string;
  filename: string;
  staticAliases: string[];
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

function resolveInstanceSignature(
  declarations: Node[],
): InstanceSignatureSpecification | undefined {
  const functions = declarations.filter(Node.isFunctionDeclaration);

  const signatures = functions.some((declaration) => !declaration.getBody())
    ? functions.filter((declaration) => !declaration.getBody())
    : functions;

  const declaration =
    signatures.find((signature) => {
      const firstParameterType = signature.getParameters().at(0)?.getTypeNode();

      return signature
        .getTypeParameters()
        .some(
          (parameter) => firstParameterType?.getText() === parameter.getName(),
        );
    }) ?? signatures.at(0);

  if (!declaration) return undefined;

  const typeParameters = declaration.getTypeParameters();

  const firstParameterType = declaration.getParameters().at(0)?.getTypeNode();

  return {
    boundTypeParameter: typeParameters
      .find(
        (parameter) => firstParameterType?.getText() === parameter.getName(),
      )
      ?.getName(),
    typeParameterNames: typeParameters.map((parameter) => parameter.getName()),
    typeParameters: typeParameters.map((parameter) => parameter.getText()),
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
      staticAliases: getStringArray(argument, "staticAliases", file) ?? [],
      helperAliases: getStringArray(argument, "helperAliases", file) ?? [],
      instanceCallable,
      instanceSignature: instanceCallable
        ? resolveInstanceSignature(declarations)
        : undefined,
      documentation,
    };
  }

  return {
    name,
    filename,
    staticAliases: [],
    helperAliases: [],
    instanceCallable: false,
    instanceSignature: undefined,
    documentation,
  };
}
