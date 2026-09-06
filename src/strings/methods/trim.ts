import { defineMethod } from "~/compiler";
import type { Stringifiable } from "~/strings/types";
import { isString } from "./isString";
import { toString } from "./toString";

export default defineMethod({
  instanceCallable: "chainable",
});

/**
 * Trims a string on both ends, removing the specified characters or pattern, or spaces by default.
 * Warning: providing a string of multiple characters will remove all occurrences of each character, not the whole string.
 */
export function trim(str: Stringifiable, chars?: string | RegExp): string {
  if (!chars) {
    return toString(str).trim();
  }

  if (isString(chars)) {
    return toString(str).replace(
      new RegExp(`^[${chars}]+|[${chars}]+$`, "g"),
      "",
    );
  }

  if (chars instanceof RegExp) {
    return toString(str).replace(
      new RegExp(`^(${chars.source})+|(${chars.source})+$`, "g"),
      "",
    );
  }

  throw new TypeError(
    "S.trim() only accepts strings or RegExp as second argument.",
  );
}
