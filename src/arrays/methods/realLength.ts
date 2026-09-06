import type { Arrayable } from "~/arrays/types";
import { defineMethod } from "~/compiler";
import { toArray } from "./toArray";

export default defineMethod({
  instanceCallable: true,
});

/**
 * Returns the length of an array without counting empty keys.
 *
 * @example ```ts
 * A.realLength([1,2,3,4]) // 4
 * A.realLength([,,,1,,,2,3]) // 3
 * ```
 */
export function realLength<T extends Arrayable>(arr: T): number {
  return Object.keys(toArray(arr)).length;
}
