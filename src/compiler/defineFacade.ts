import { Constructor } from "~/functions/types";

export type FacadeDefinition = Readonly<{
  /**
   * The name of the class for the facade.
   */
  name: string;

  /**
   * The class constructor that the facade extends.
   */
  extends?: Constructor;

  /**
   * Aliases for the facade class name exposed on the main module.
   *
   * @default []
   */
  aliases?: string[];

  /**
   * Whether the facade supports being instantiated.
   *
   * @default false
   */
  instantiable?: boolean;

  /**
   * Whether the facade supports being called like a function.
   *
   * @default false
   */
  callable?: boolean;
}>;

export function defineFacade<const Definition extends FacadeDefinition>(
  definition: Definition,
): Definition {
  return definition;
}
