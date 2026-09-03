import type { Arrayable } from "~/arrays/types";
import { type ToArray, toArray } from "./toArray";

/**
 * Returns a new array where empty keys have been removed.
 *
 * @example ```ts
 * A.toCollapsed([,,,1,,,2,3]) // [1,2,3]
 * ```
 */
export function toCollapsed<T extends Arrayable>(arr: T): ToArray<T> {
  return <ToArray<T>>toArray(arr).flat(0);
}
