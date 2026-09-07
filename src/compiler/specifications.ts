import type { JSDoc } from "ts-morph";

export type ImportSpecification = { name: string; filename: string };

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

export type ClassSpecification = {
  callable: boolean;
  code: string;
  constructor: ConstructorSpecification;
  declarationTypeParameters: string[];
  imports: ClassImportSpecification[];
  inputTypeParameter: string | undefined;
  name: string;
  typeParameterNames: string[];
  typeParameters: string[];
  valueTypeParameter: string | undefined;
};

export type FacadeSpecification = {
  aliases: string[];
  callable: ImportSpecification | undefined;
  class: ClassSpecification;
  factory: string | undefined;
  name: string;
};

export type InstanceCallable = false | true | "chainable";

export type InstanceSignatureImportSpecification = {
  filename: string | undefined;
  kind: "default" | "named" | "namespace";
  localName: string;
  moduleSpecifier: string;
  name: string;
};

export type InstanceOverloadSpecification = {
  boundTypeParameter: string | undefined;
  firstParameterName: string;
  parameters: string[];
  returnType: string;
  typeParameterNames: string[];
  typeParameters: string[];
};

export type InstanceSignatureSpecification = {
  declarations: string[];
  imports: InstanceSignatureImportSpecification[];
  overloads: InstanceOverloadSpecification[];
};

export type MethodSpecification = {
  documentation: JSDoc[];
  filename: string;
  helperAliases: string[];
  instanceCallable: InstanceCallable;
  instanceSignature: InstanceSignatureSpecification | undefined;
  methodAliases: string[];
  name: string;
};

export type CompilerPaths = {
  entrypoint: string;
  root: string;
  src: string;
  resolve(...paths: string[]): string;
};

export type CompilerGroup = {
  facadeOutput: string;
  facadePath: string;
  methodsDirectory: string;
  methodsOutput: string;
  name: string;
  typesPath: string;
};
