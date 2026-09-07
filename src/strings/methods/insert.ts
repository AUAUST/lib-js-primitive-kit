import { defineMethod } from "~/compiler";
import type { Stringifiable, ToString } from "~/strings/types";
import { toString } from "./toString";

export default defineMethod({
  instanceCallable: "chainable",
});

/**
 * Inserts a substring into the string at the specified index.
 */
export function insert<const T extends Stringifiable>(
  str: Stringifiable,
  substring: T,
  index?: number,
): `${string}${ToString<T>}${string}`;
export function insert(
  str: Stringifiable,
  substring: Stringifiable,
  index: number = 0,
): string {
  const s1 = toString(str);
  const s2 = toString(substring);
  const i =
    index < 0
      ? // +1 ensures -1 is "end of string" instead of "before last character"
        s1.length + index + 1
      : index;

  return s1.slice(0, i) + s2 + s1.slice(i);
}
