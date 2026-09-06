import { defineMethod } from "~/compiler";
import { isArray } from "./isArray";

export default defineMethod({
  staticAliases: ["isStrict"],
  helperAliases: ["isStrictArray"],
});

/**
 * Shorthand for `Array.isArray()`, but also checks if the array has a length greater than 0.
 */
export function isNotEmpty(arr: any): arr is any[] {
  return isArray(arr) && arr.length > 0;
}
