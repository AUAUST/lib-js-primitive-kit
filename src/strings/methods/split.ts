import { defineMethod } from "~/compiler";
import type { Stringifiable, ToString } from "~/strings/types";
import { toString } from "./toString";

export default defineMethod({
  instanceCallable: true,
});

export type Split<S extends string, D extends string> = string extends S
  ? string[]
  : S extends ""
    ? []
    : S extends `${infer T}${D}${infer U}`
      ? [T, ...Split<U, D>]
      : [S];

/**
 * Split a string into substrings using the specified separator and return them as an array.
 * The separator can be a string or a regex, or be omitted to split by characters.
 * The third argument, `limit`, is the maximum number of splits to do.
 * @example ```ts
 * S.split("a.b.c.d.e", "."); // ["a", "b", "c", "d", "e"]
 * S.split("a.b.c.d.e", "-"); // ["a.b.c.d.e"]
 * S.split("a.b.c.d.e") // ["a.b.c.d.e"]
 * S.split("a.b.c.d.e", ".", 2); // ["a", "b.c.d.e"]
 * ```
 */
export function split<S extends Stringifiable, D extends Stringifiable>(
  str: S,
  separator?: D,
  limit?: number,
): Split<ToString<S>, ToString<D>>;
export function split(
  str: Stringifiable,
  separator?: Stringifiable,
  limit?: number,
): string[] {
  const s1 = toString(str);

  if (limit === 1) {
    return [s1];
  }

  const s2 = toString(separator);

  if (!limit || limit < 0) {
    return s1.split(s2);
  }

  // We use a custom implementation to handle limits, because the native split
  // "splits everything and trim to the limit", which means we lose the last part of our string.
  // i.e., "a,b,c,d".split(",", 2) => ["a", "b"], where we want ["a", "b,c,d"].

  const parts = s1.split(s2);

  if (parts.length <= limit) {
    return parts;
  }

  const overflow = parts.slice(limit - 1).join(s2);

  parts.length = limit - 1;
  parts.push(overflow);

  return parts;
}
