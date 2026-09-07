import type { ArrayValue, Arrayable } from "~/arrays/types";
import { defineMethod } from "~/compiler";
import { lastKey } from "./lastKey";
import { toArray } from "./toArray";

export default defineMethod({
  instanceCallable: true,
});

/**
 * Returns the last value of the array.
 *
 * @example ```ts
 * A.lastValue([1,2,3]) // 3
 * A.lastValue([,,,1,,,2,3]) // 3
 * ```
 */
export function last<const T extends Arrayable>(arr: T): ArrayValue<T> {
  const a = toArray(arr),
    k = lastKey(a);

  return k === undefined ? undefined! : a[k];
}
