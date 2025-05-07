import type { Fn } from "~/functions/types";
import { isBindable } from "./isBindable";

/**
 * @important This does not work for async functions, as they never have a prototype.
 * @see https://stackoverflow.com/a/35687230
 */
export function isBound(fn: Fn): boolean {
  return !isBindable(fn);
}
