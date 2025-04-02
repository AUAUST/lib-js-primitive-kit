import { isArray } from "./isArray";

export function reverse<T extends any[]>(arr: T): T[keyof T & number][] {
  if (!isArray(arr)) {
    throw new TypeError("reverse called on non-array");
  }

  return arr.reverse();
}
