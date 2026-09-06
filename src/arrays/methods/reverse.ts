import { defineMethod } from "~/compiler";
import { isArray } from "./isArray";

export default defineMethod({
  instanceCallable: "chainable",
});

/**
 * Reverses the array in place.
 */
export function reverse<T extends any[]>(arr: T): T[keyof T & number][] {
  if (!isArray(arr)) {
    throw new TypeError("reverse called on non-array");
  }

  return arr.reverse();
}
