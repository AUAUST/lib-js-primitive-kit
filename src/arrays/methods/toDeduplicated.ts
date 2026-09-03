import type { Arrayable } from "~/arrays/types";
import { type ToArray, toArray } from "./toArray";

/** Returns a new array where duplicate values have been removed. */
export function toDeduplicated<T extends Arrayable>(arr: T): ToArray<T> {
  return <ToArray<T>>Array.from(new Set(toArray(arr)));
}
