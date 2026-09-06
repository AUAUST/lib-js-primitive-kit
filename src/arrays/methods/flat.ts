import type { Arrayable } from "~/arrays/types";
import { defineMethod } from "~/compiler";
import { toArray } from "./toArray";

export default defineMethod({
  instanceCallable: true,
});

/**
 * Returns a new array with all sub-array elements concatenated into it recursively up to the specified depth.
 */
export function flat<T extends Arrayable, D extends number = 1>(
  arr: T,
  depth?: D,
): FlatArray<T, D>[] {
  return toArray(arr).flat(depth === -1 ? Infinity : (depth ?? 1));
}
