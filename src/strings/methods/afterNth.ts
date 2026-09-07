import { defineMethod } from "~/compiler";
import type { Stringifiable } from "~/strings/types";
import { nthIndexOf } from "./nthIndexOf";
import { toString } from "./toString";

export default defineMethod({
  instanceCallable: "chainable",
});

/**
 * Returns the substring after the nth occurrence of a specified substring.
 * If the substring is not found or is present less times than the specified number, an empty string is returned.
 * The position is 0-based.
 * Negative numbers search from the end of the string.
 * @example ```ts
 * S.afterNth("0.1.2.3", ".", 0); // "1.2.3"
 * S.afterNth("0.1.2.3", ".", 1); // "2.3"
 * S.afterNth("0.1.2.3", ".", 4); // ""
 * S.afterNth("0.1.2.3", ".", -1); // "3"
 * S.afterNth("0.1.2.3", ".", -3); // "1.2.3"
 * S.afterNth("0.1.2.3", ".", -5); // ""
 */
export function afterNth(
  str: Stringifiable,
  substring: Stringifiable,
  nth: number,
): string {
  const s1 = toString(str);

  const s2 = toString(substring);

  const i = nthIndexOf(s1, s2, nth);

  if (i === -1) {
    return "";
  }

  return s1.slice(i + s2.length);
}
