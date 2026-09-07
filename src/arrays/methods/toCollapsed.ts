import type { Arrayable } from "~/arrays/types";
import { defineMethod } from "~/compiler";
import type { ToArray } from "~/arrays/types";
import { toArray } from "./toArray";

export default defineMethod({
  instanceCallable: true,
});

/**
 * Returns a new array where empty keys have been removed.
 *
 * @example ```ts
 * A.toCollapsed([,,,1,,,2,3]) // [1,2,3]
 * ```
 */
export function toCollapsed<const T extends Arrayable>(arr: T): ToArray<T, false> {
  return <ToArray<T, false>>toArray(arr).flat(0);
}
