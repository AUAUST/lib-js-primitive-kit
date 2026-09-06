import { defineMethod } from "~/compiler";
import type { Stringifiable } from "~/strings/types";
import { toString } from "./toString";

export default defineMethod({
  instanceCallable: true,
});

/**
 * Returns the nth occurrence of the specified substring in the string.
 * The position is 0-based.
 * Negative numbers search from the end of the string.
 * If the substring is not found or is present less times than the specified number, `-1` is returned.
 * @example ```ts
 * S.nthIndexOf("a.b.c.d.e", ".", 0); // 1
 * S.nthIndexOf("a.b.c.d.e", ".", 1); // 3
 * S.nthIndexOf("a.b.c.d.e", ".", -1); // 7
 * S.nthIndexOf("a.b.c.d.e", ".", -2); // 5
 * ```
 */
export function nthIndexOf(
  str: Stringifiable,
  substring: Stringifiable,
  nth: number,
): number {
  const s1 = toString(str);
  const s2 = toString(substring);

  let i: number;

  if (nth < 0) {
    i = s1.length;

    for (let n = 0; n > nth; n--) {
      i = s1.lastIndexOf(s2, i - 1);

      if (i === -1) {
        return -1;
      }
    }
  } else {
    i = -1;

    for (let n = -1; n < nth; n++) {
      i = s1.indexOf(s2, i + 1);

      if (i === -1) {
        return -1;
      }
    }
  }

  return i;
}
