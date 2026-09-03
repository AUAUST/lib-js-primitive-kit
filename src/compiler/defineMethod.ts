export type MethodDefinition<
  StaticAliases extends readonly string[] = readonly string[],
  HelperAliases extends readonly string[] = readonly string[],
> = Readonly<{
  /**
   * Aliases to the method on the static facade.
   *
   * @default []
   */
  staticAliases?: StaticAliases;

  /**
   * Aliases to the method when imported as a helper from submodules.
   *
   * @default []
   */
  helperAliases?: HelperAliases;

  /**
   * Whether the method can be called on instanciated objects.
   *
   * @default false
   */
  instanceCallable?: boolean;
}>;

export function defineMethod<const Definition extends MethodDefinition>(
  definition: Definition,
): Definition {
  return definition;
}
