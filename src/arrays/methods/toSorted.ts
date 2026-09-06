import type { ArrayValue, Arrayable } from "~/arrays/types";
import { defineMethod } from "~/compiler";
import type { ToArray } from "./toArray";
import { toCopiedArray } from "./toCopiedArray";

export default defineMethod({
  instanceCallable: true,
});

/**
 * Returns a copy of the array sorted.
 */
export function toSorted<T extends Arrayable>(
  arr: T,
  compareFn?: (a: ArrayValue<T>, b: ArrayValue<T>) => number,
): ToArray<T, false> {
  return <ToArray<T, false>>toCopiedArray(arr).sort(compareFn);
}
