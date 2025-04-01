import { type ComparisonOptions, comparisonOptions } from "~/strings/helpers";
import { toString } from "~/strings/methods/toString";
import { unaccent } from "~/strings/methods/unaccent";
import type { Stringifiable, ToString } from "~/strings/types";

export function equals<T extends Stringifiable>(
  str1: T,
  str2: Stringifiable,
  options?: ComparisonOptions
): str2 is Stringifiable<ToString<T>> {
  let s1: string = toString(str1);
  let s2: string = toString(str2);

  const {
    caseSensitive,
    trim,
    unaccent: unaccented,
  } = comparisonOptions(options);

  if (trim) {
    s1 = s1.trim();
    s2 = s2.trim();
  }

  if (unaccented) {
    s1 = unaccent(s1);
    s2 = unaccent(s2);
  }

  if (caseSensitive) {
    return s1 === s2;
  }

  return s1.toLowerCase() === s2.toLowerCase();
}
