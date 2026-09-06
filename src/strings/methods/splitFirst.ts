import type { Stringifiable, ToString } from "~/strings/types";
import type { AfterFirst } from "./afterFirst";
import type { BeforeFirst } from "./beforeFirst";
import { toString } from "./toString";

import { defineMethod } from "~/compiler";

export default defineMethod({
  instanceCallable: true,
});

export type SplitFirst<T extends Stringifiable, U extends Stringifiable> =
  ToString<T> extends `${string}${ToString<U>}${string}`
    ? [BeforeFirst<T, U>, AfterFirst<T, U>]
    : [T, ""];

/**
 * Splits the string into two parts at the first occurrence of the specified substring.
 * If the substring is not found, returns the full string as the first part and an empty string as the second part.
 * @example ```ts
 * S.splitFirst("a.b.c.d.e", "."); // ["a", "b.c.d.e"]
 * S.splitFirst("a.b.c.d.e", "-"); // ["a.b.c.d.e", ""]
 * ```
 */
export function splitFirst<T extends Stringifiable, U extends Stringifiable>(
  str: Stringifiable,
  separator: Stringifiable,
): SplitFirst<T, U>;
export function splitFirst(
  str: Stringifiable,
  separator: Stringifiable,
): [string, string] {
  const s1 = toString(str);
  const s2 = toString(separator);
  const i = s1.indexOf(s2);

  if (i === -1) {
    return [s1, ""];
  }

  return [s1.slice(0, i), s1.slice(i + s2.length)];
}
