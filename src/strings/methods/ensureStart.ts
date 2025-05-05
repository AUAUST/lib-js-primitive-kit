import { type ComparisonOptions } from "~/strings/helpers";
import type { Stringifiable, ToString } from "~/strings/types";
import { startsWith } from "./startsWith";
import { toString } from "./toString";

export function ensureStart<T extends Stringifiable>(
  str: Stringifiable,
  substring: T,
  options?: ComparisonOptions
): `${ToString<T>}${string}`;
export function ensureStart(
  str: Stringifiable,
  substring: Stringifiable,
  options?: ComparisonOptions
): string {
  const s1 = toString(str);
  const s2 = toString(substring);

  return startsWith(s1, s2, options) ? s1 : s2 + s1;
}
