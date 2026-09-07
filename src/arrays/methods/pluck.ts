import type { ArrayValue, Arrayable } from "~/arrays/types";
import { defineMethod } from "~/compiler";
import { toArray } from "./toArray";

export default defineMethod({
  instanceCallable: true,
});

/**
 * Plucks the selected key from each entry in the array.
 */
export function pluck<const T extends Arrayable, const K extends keyof ArrayValue<T>>(
  arr: T,
  key: K,
): ArrayValue<T>[K][] {
  return toArray(arr).map((v) => v[key]);
}
