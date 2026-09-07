import { defineMethod } from "~/compiler";
import type { Split, Stringifiable, ToString } from "~/strings/types";
import { toString } from "./toString";

export default defineMethod({
  helperAliases: ["toArray", "stringToArray"],
  methodAliases: ["toArray"],
  instanceCallable: true,
});

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
export function split<
  const S extends Stringifiable,
  const D extends Stringifiable,
>(
  string: S,
  separator?: D,
  limit?: number,
): Split<ToString<S>, ToString<D>>;
export function split(
  string: Stringifiable,
  separator?: RegExp,
  limit?: number,
): string[];
export function split(
  string: Stringifiable,
  separator?: Stringifiable | RegExp,
  limit?: number,
): string[] {
  const str = toString(string);

  if (limit === 1) {
    return [str];
  }

  if (separator instanceof RegExp) {
    return str.split(separator, limit);
  }

  const sep = toString(separator);

  if (!limit || limit < 0) {
    return str.split(sep);
  }

  // We use a custom implementation to handle limits, because the native split
  // "splits everything and trim to the limit", which means we lose the last part of our string.
  // i.e., "a,b,c,d".split(",", 2) => ["a", "b"], where we want ["a", "b,c,d"].

  const parts = str.split(sep);

  if (parts.length <= limit) {
    return parts;
  }

  const overflow = parts.slice(limit - 1).join(sep);

  parts.length = limit - 1;
  parts.push(overflow);

  return parts;
}
