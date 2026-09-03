import type { Arrayable } from "~/arrays/types";
import { toCopiedArray } from "./toCopiedArray";

/** Returns a copy of the array where the values are reversed. */
export function toReversed<T>(arr: Arrayable<T>): T[];
export function toReversed(arr: Arrayable): unknown[] {
  return toCopiedArray(arr).reverse();
}
