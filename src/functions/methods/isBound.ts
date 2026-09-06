import { defineMethod } from "~/compiler";
import type { Fn } from "~/functions/types";
import { isBindable } from "./isBindable";

export default defineMethod({
  instanceCallable: true,
});

/**
 * Whether the function is bound or not. A function that is bound may no
 * longer be called with a different `this` context than the one it was bound to.
 *
 * **IMPORTANT** This does not work for async functions, as they never have a prototype.
 * They will always return `true` regardless of whether they are bound or not.
 *
 * @important This does not work for async functions, as they never have a prototype.
 * @see https://stackoverflow.com/a/35687230
 */
export function isBound(fn: Fn): boolean {
  return !isBindable(fn);
}
