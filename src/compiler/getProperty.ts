import assert from "assert";
import {
  Expression,
  Node,
  ObjectLiteralExpression,
  SourceFile,
} from "ts-morph";

export function getProperty(
  object: ObjectLiteralExpression,
  propertyName: string,
  sourceFile: SourceFile,
): Expression | undefined {
  const property = object.getProperty(propertyName);

  if (property) {
    assert(
      Node.isPropertyAssignment(property),
      `${sourceFile.getFilePath()}: expected ${propertyName} to be a property`,
    );

    const expression = property.getInitializer()!;

    assert(
      Node.isExpression(expression),
      `${sourceFile.getFilePath()}: expected ${propertyName} to be an expression`,
    );

    return expression;
  }
}

export function getString(
  object: ObjectLiteralExpression,
  propertyName: string,
  sourceFile: SourceFile,
): string | undefined {
  const value = getProperty(object, propertyName, sourceFile);

  if (value) {
    assert(
      Node.isStringLiteral(value),
      `${sourceFile.getFilePath()}: expected ${propertyName} to be a string literal`,
    );

    return value.getLiteralValue();
  }
}

export function getBoolean(
  object: ObjectLiteralExpression,
  propertyName: string,
  sourceFile: SourceFile,
): boolean | undefined {
  const value = getProperty(object, propertyName, sourceFile);

  if (value) {
    assert(
      Node.isTrueLiteral(value) || Node.isFalseLiteral(value),
      `${sourceFile.getFilePath()}: expected ${propertyName} to be true or false`,
    );

    return Node.isTrueLiteral(value);
  }
}

export function getStringArray(
  object: ObjectLiteralExpression,
  propertyName: string,
  sourceFile: SourceFile,
): string[] | undefined {
  const value = getProperty(object, propertyName, sourceFile);

  if (value) {
    assert(
      Node.isArrayLiteralExpression(value),
      `${sourceFile.getFilePath()}: expected ${propertyName} to be an array literal`,
    );

    return value.getElements().map((element) => {
      assert(
        Node.isStringLiteral(element),
        `${sourceFile.getFilePath()}: expected ${propertyName} to be an array of string literals`,
      );

      return element.getLiteralValue();
    });
  }
}
