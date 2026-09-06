import { defineMethod } from "~/compiler";
import type { Stringifiable } from "~/strings/types";
import { toString } from "./toString";

export default defineMethod({
  instanceCallable: "chainable",
});

/**
 * Removes all occurrences of the specified substring from the string.
 */
export function remove(
  str: Stringifiable,
  substring: Stringifiable | RegExp,
): string {
  return substring instanceof RegExp
    ? toString(str).replace(substring, "")
    : toString(str).replaceAll(toString(substring), "");
}
