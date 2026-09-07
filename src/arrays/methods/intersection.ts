import type { Arrayable } from "~/arrays/types";
import { defineMethod } from "~/compiler";
import { toArray } from "./toArray";

export default defineMethod({
  instanceCallable: true,
});

/**
 * Returns the values of the first array that are also present in the second array.
 */
export function intersection<const T>(arr: Arrayable<T>, include: Arrayable<T>): T[];
export function intersection(arr: Arrayable, include: Arrayable): unknown[] {
  const set = new Set(toArray(include));

  return toArray(arr).filter((item) => set.has(item));
}
