import { defineMethod } from "~/compiler";
import type { ComparisonOptions } from "~/strings/types";
import type { Stringifiable, ToString } from "~/strings/types";
import { startsWith } from "./startsWith";
import { toString } from "./toString";

export default defineMethod({
  instanceCallable: "chainable",
});

/**
 * Ensures the string starts with the provided substring.
 * If the string already starts with the substring, it is returned as-is.
 * Otherwise, the substring is prepended to the string.
 */
export function ensureStart<const T extends Stringifiable>(
  str: Stringifiable,
  substring: T,
  options?: ComparisonOptions,
): `${ToString<T>}${string}`;
export function ensureStart(
  str: Stringifiable,
  substring: Stringifiable,
  options?: ComparisonOptions,
): string {
  const s1 = toString(str);
  const s2 = toString(substring);

  return startsWith(s1, s2, options) ? s1 : s2 + s1;
}
