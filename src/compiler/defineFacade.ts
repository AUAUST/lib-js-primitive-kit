import type { Constructor, Fn } from "~/functions/types";

export type FacadeClass = Constructor<{ valueOf(): unknown }, [value: any]>;

export type FacadeDefinition = Readonly<{
  /**
   * The name of the class for the facade.
   */
  name: string;

  /**
   * The handwritten base class used by the generated facade.
   */
  class: FacadeClass;

  /**
   * Aliases for the facade class name exposed on the main module.
   *
   * @default []
   */
  aliases?: string[];

  /**
   * The function used when the facade is called.
   */
  callable?: Fn;

  /**
   * The shortcut factory function name used to create instances of the facade.
   */
  factory?: string;
}>;

export function defineFacade<const Definition extends FacadeDefinition>(
  definition: Definition,
): Definition {
  return definition;
}
