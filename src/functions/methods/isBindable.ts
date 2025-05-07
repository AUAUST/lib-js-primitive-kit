import type { Fn } from "~/functions/types";

/**
 * @important This does not work for async functions, as they never have a prototype.
 * @see https://stackoverflow.com/a/35687230
 */
export function isBindable(fn: Fn): boolean {
  return fn.hasOwnProperty("prototype");
}
