import type { Arrayable } from "~/arrays/types";
import { defineMethod } from "~/compiler";
import { toCopiedArray } from "./toCopiedArray";

export default defineMethod({
  instanceCallable: true,
});

/**
 * Returns a copy of the array where the values are reversed.
 */
export function toReversed<const T>(arr: Arrayable<T>): T[];
export function toReversed(arr: Arrayable): unknown[] {
  return toCopiedArray(arr).reverse();
}
