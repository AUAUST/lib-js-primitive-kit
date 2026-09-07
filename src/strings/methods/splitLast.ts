import { defineMethod } from "~/compiler";
import type { Stringifiable } from "~/strings/types";
import { toString } from "./toString";

export default defineMethod({
  instanceCallable: true,
});

/**
 * Splits the string into two parts at the last occurrence of the specified substring.
 * If the substring is not found, returns the full string as the first part and an empty string as the second part.
 * @example ```ts
 * S.splitLast("a.b.c.d.e", "."); // ["a.b.c.d", "e"]
 * S.splitLast("a.b.c.d.e", "-"); // ["a.b.c.d.e", ""]
 */
export function splitLast(
  str: Stringifiable,
  separator: Stringifiable,
): [string, string] {
  const s1 = toString(str);

  const s2 = toString(separator);

  const i = s1.lastIndexOf(s2);

  if (i === -1) {
    return [s1, ""];
  }

  return [s1.slice(0, i), s1.slice(i + s2.length)];
}
