import type { ArrayValue, Arrayable } from "~/arrays/types";
import { toArray } from "./toArray";

/** Returns whether the array contains the given value. */
export function includes<T extends Arrayable>(
  arr: T,
  value: ArrayValue<T>,
): boolean {
  return toArray(arr).includes(value);
}
