export type MethodDefinition<
  MethodAliases extends readonly string[] = readonly string[],
  HelperAliases extends readonly string[] = readonly string[],
> = Readonly<{
  /**
   * Aliases to the method on the static facade and instances.
   *
   * @default []
   */
  methodAliases?: MethodAliases;

  /**
   * Aliases to the method when imported as a helper from submodules.
   *
   * @default []
   */
  helperAliases?: HelperAliases;

  /**
   * Exposes the helper on facade instances, replacing its first argument with
   * the instance value. `"chainable"` wraps the result in a new facade.
   *
   * @default false
   */
  instanceCallable?: boolean | "chainable";
}>;

export function defineMethod<const Definition extends MethodDefinition>(
  definition: Definition,
): Definition {
  return definition;
}
