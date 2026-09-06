import { isArray } from "./isArray";

/**
 * Sorts an array in place.
 */
export function sort<T>(arr: T[], compareFn?: (a: T, b: T) => number): T[] {
  if (!isArray(arr)) {
    throw new TypeError("sort called on non-array");
  }

  return arr.sort(compareFn);
}
