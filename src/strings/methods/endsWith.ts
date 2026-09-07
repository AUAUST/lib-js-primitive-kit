import { defineMethod } from "~/compiler";
import { comparisonOptions } from "~/strings/helpers";
import type { ComparisonOptions } from "~/strings/types";
import type { Stringifiable, ToString } from "~/strings/types";
import { toString } from "./toString";
import { unaccent } from "./unaccent";

export default defineMethod({
  instanceCallable: true,
});

/**
 * Returns a boolean whether the string ends with the specified substring.
 * The last argument provides options for the comparison.
 */
export function endsWith<const T extends Stringifiable>(
  str: Stringifiable,
  substring: T,
  options?: ComparisonOptions,
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
