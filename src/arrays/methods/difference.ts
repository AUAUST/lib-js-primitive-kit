import type { Arrayable } from "~/arrays/types";
import { defineMethod } from "~/compiler";
import { toArray } from "./toArray";

export default defineMethod({
  instanceCallable: true,
});

/**
 * Returns the values of first array that are not present in the second array.
 */
export function difference<T, U>(arr: Arrayable<T>, exclude: Arrayable<U>): T[];
export function difference(arr: Arrayable, exclude: Arrayable): unknown[] {
  const set = new Set(toArray(exclude));

  return toArray(arr).filter((v) => !set.has(v));
}
