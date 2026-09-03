import { type ComparisonOptions } from "~/strings/helpers";
import type { Stringifiable, ToString } from "~/strings/types";
import { endsWith } from "./endsWith";
import { toString } from "./toString";

/**
 * Ensures the string ends with the provided substring.
 * If the string already ends with the substring, it is returned as-is.
 * Otherwise, the substring is appended to the string.
 */
export function ensureEnd<T extends Stringifiable>(
  str: Stringifiable,
  substring: T,
  options?: ComparisonOptions,
): `${string}${ToString<T>}`;
export function ensureEnd(
  str: Stringifiable,
  substring: Stringifiable,
  options?: ComparisonOptions,
): string {
  const s1 = toString(str);
  const s2 = toString(substring);

  return endsWith(s1, s2, options) ? s1 : s1 + s2;
}
