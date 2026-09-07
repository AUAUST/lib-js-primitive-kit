import type { ArrayValue, Arrayable, ToArray } from "~/arrays/types";
import { defineMethod } from "~/compiler";
import { toCopiedArray } from "./toCopiedArray";

export default defineMethod({
  instanceCallable: true,
});

/**
 * Returns a copy of the array sorted.
 */
export function toSorted<const T extends Arrayable>(
  arr: T,
  compareFn?: (a: ArrayValue<T>, b: ArrayValue<T>) => number,
): ToArray<T, false> {
  return <ToArray<T, false>>toCopiedArray(arr).sort(compareFn);
}
