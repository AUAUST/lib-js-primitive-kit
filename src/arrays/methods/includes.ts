import type { ArrayValue, Arrayable } from "~/arrays/types";
import { defineMethod } from "~/compiler";
import { toArray } from "./toArray";

export default defineMethod({
  staticAliases: ["contains"],
  helperAliases: ["contains"],
});

/** Returns whether the array contains the given value. */
export function includes<T extends Arrayable>(
  arr: T,
  value: ArrayValue<T>,
): boolean {
  return toArray(arr).includes(value);
}
