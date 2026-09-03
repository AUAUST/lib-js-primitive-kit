import type { Stringifiable } from "~/strings/types";
import { nthIndexOf } from "./nthIndexOf";
import { toString } from "./toString";

/**
 * Returns the substring before the nth occurrence of a specified substring.
 * If the substring is not found or is present less times than the specified number, an empty string is returned.
 * The position is 0-based.
 * Negative numbers search from the end of the string.
 * @example ```ts
 * S.beforeNth("0.1.2.3", ".", 0); // "0"
 * S.beforeNth("0.1.2.3", ".", 1); // "0.1"
 * S.beforeNth("0.1.2.3", ".", 2); // "0.1.2"
 * S.beforeNth("0.1.2.3", ".", 3); // ""
 * S.beforeNth("0.1.2.3", ".", -1); // "0.1.2"
 * S.beforeNth("0.1.2.3", ".", -4); // ""
 * ```
 */
export function beforeNth(
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

  return s1.slice(0, i);
}
