import { isArray } from "./isArray";

export function lastKey(arr: []): number | undefined; // While we know undefined will be returned, including number makes it more convenient to use
export function lastKey(arr: (void | never | undefined)[]): number | undefined;
export function lastKey(arr: unknown[]): number;
export function lastKey(arr: unknown[]): number | undefined {
  if (!isArray(arr)) {
    throw new TypeError("lastKey called on non-array");
  }

  // Unlike `[].some` used for `firstKey`, there is no easy way to get the last index of an array.
  // Instead, we iterate backwards. `i in arr` ensures empty entries at the end of the array are ignored.
  for (let i = arr.length - 1; i >= 0; i--) {
    if (i in arr) {
      return i;
    }
  }

  return undefined!;
}
