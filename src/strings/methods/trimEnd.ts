import type { Stringifiable } from "~/strings/types";
import { isString } from "./isString";
import { toString } from "./toString";

/**
 * Trims a string on the right, removing the specified characters or pattern, or spaces by default.
 * Warning: providing a string of multiple characters will remove all occurrences of each character, not the whole string.
 */
export function trimEnd(str: Stringifiable, chars?: string | RegExp): string {
  if (!chars) {
    return toString(str).trimEnd();
  }

  if (isString(chars)) {
    return toString(str).replace(new RegExp(`[${chars}]+$`, "g"), "");
  }

  if (chars instanceof RegExp) {
    return toString(str).replace(new RegExp(`(${chars.source})+$`, "g"), "");
  }

  throw new TypeError(
    "S.trimEnd() only accepts strings or RegExp as second argument.",
  );
}
