import { isArray } from "./isArray";

/** Reverses the array in place. */
export function reverse<T extends any[]>(arr: T): T[keyof T & number][] {
  if (!isArray(arr)) {
    throw new TypeError("reverse called on non-array");
  }

  return arr.reverse();
}
