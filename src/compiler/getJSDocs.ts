import { type JSDoc, Node } from "ts-morph";

export function getJSDocs(declaration: Node): JSDoc[] {
  let docs: JSDoc[] | undefined;

  switch (true) {
    case Node.isFunctionDeclaration(declaration):
      docs = declaration.getJsDocs();
      break;

    case Node.isVariableDeclaration(declaration):
      docs = declaration.getVariableStatementOrThrow().getJsDocs();
      break;

    case Node.isClassDeclaration(declaration):
    case Node.isInterfaceDeclaration(declaration):
    case Node.isTypeAliasDeclaration(declaration):
    case Node.isEnumDeclaration(declaration):
      docs = declaration.getJsDocs();
      break;
  }

  return docs ?? [];
}
