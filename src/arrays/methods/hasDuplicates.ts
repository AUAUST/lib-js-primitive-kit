import type { Arrayable } from "~/arrays/types";
import { defineMethod } from "~/compiler";
import { toArray } from "./toArray";

export default defineMethod({
  instanceCallable: true,
});

/**
 * Returns a boolean whether the array has duplicate values.
 */
export function hasDuplicates(arr: Arrayable): boolean {
  const a = toArray(arr);

  return new Set(a).size !== a.length;
}
