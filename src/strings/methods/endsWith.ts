import { comparisonOptions, type ComparisonOptions } from "~/strings/helpers";
import type { Stringifiable, ToString } from "~/strings/types";
import { toString } from "./toString";
import { unaccent } from "./unaccent";

export function endsWith<T extends Stringifiable>(
  str: Stringifiable,
  substring: T,
  options?: ComparisonOptions
): str is `${string}${ToString<T>}` {
  let s1: string = toString(str);
  let s2: string = toString(substring);
  const {
    caseSensitive,
    trim,
    unaccent: unaccented,
  } = comparisonOptions(options, {
    caseSensitive: true,
  });

  if (trim) {
    s1 = s1.trimEnd();
    s2 = s2.trimEnd();
  }

  if (s2 === "") {
    return true;
  }

  if (unaccented) {
    s1 = unaccent(s1);
    s2 = unaccent(s2);
  }

  if (caseSensitive) {
    return s1.endsWith(s2);
  }

  return s1.toLowerCase().endsWith(s2.toLowerCase());
}
