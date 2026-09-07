import type { ArrayValue, Arrayable } from "~/arrays/types";
import { defineMethod } from "~/compiler";
import { firstKey } from "./firstKey";
import { toArray } from "./toArray";

export default defineMethod({
  instanceCallable: true,
});

/**
 * Returns the first value of the array that is not `undefined`, and that is not an empty key.
 *
 * @example ```ts
 * A.firstValue([1,2,3]) // 1
 * A.firstValue([,,,1,,,2,3]) // 1
 * ```
 */
export function first<const T extends Arrayable>(arr: T): ArrayValue<T> {
  const a = toArray(arr),
    k = firstKey(a);

  return k === undefined ? undefined! : a[k];
}
