import { defineMethod } from "~/compiler";
import type { Stringifiable } from "~/strings/types";
import { nthIndexOf } from "./nthIndexOf";
import { toString } from "./toString";

export default defineMethod({
  instanceCallable: true,
});

/**
 * Split the string into two parts at the nth occurrence of the specified substring. The position is 0-based.
 * Negative numbers search from the end of the string.
 * If the substring is not found, returns the full string as the first part and an empty string as the second part regardless of the search direction.
 * @example ```ts
 * S.splitNth("a.b.c.d.e", ".", 1); // ["a.b", "c.d.e"]
 * S.splitNth("a.b.c.d.e", ".", -1); // ["a.b.c.d", "e"]
 * S.splitNth("a.b.c.d.e", ".", 10); // ["a.b.c.d.e", ""]
 * S.splitNth("a.b.c.d.e", ".", -10); // ["a.b.c.d.e", ""]
 * S.splitNth("a.b.c.d.e", "-", 2); // ["a.b.c.d.e", ""]
 * ```
 */
export function splitNth(
  str: Stringifiable,
  separator: Stringifiable,
  nth: number,
): [string, string] {
  const s1 = toString(str);
  const s2 = toString(separator);
  const i = nthIndexOf(s1, s2, nth);

  if (i === -1) {
    return [s1, ""];
  }

  return [s1.slice(0, i), s1.slice(i + s2.length)];
}
