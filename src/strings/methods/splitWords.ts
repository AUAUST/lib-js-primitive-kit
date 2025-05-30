import { casingOptions, type CasingOptions } from "~/strings/helpers";
import type { Stringifiable } from "~/strings/types";
import { toString } from "./toString";
import { unaccent } from "./unaccent";

/**
 * This regex will match all non-alphanumeric characters,
 * using `\p{L}` which matches any letter in any language,
 * including accented characters and non-Latin scripts.
 * It also uses `\d` to match any digit.
 */
const NON_ALPHANUMERIC_REGEX = /[^\p{L}\d]+/gu;

/**
 * This regex will match all non-alphanumeric characters
 * using the same approach as above, but it will also match
 * characters directly followed by a capital letter using
 * lookahead assertion `(?=[\p{Lu}])`.
 */
const NON_ALPHANUMERIC_OR_CHARACTER_BEFORE_CAPITAL_REGEX =
  /[^\p{L}\d]+|(?=[\p{Lu}])/gu;

export function splitWords(
  str: Stringifiable,
  options?: CasingOptions
): string[] {
  const { ignoreCaps, unaccent: unaccented } = casingOptions(options);
  const string = unaccented ? unaccent(str) : toString(str);

  const regex = ignoreCaps
    ? NON_ALPHANUMERIC_REGEX
    : NON_ALPHANUMERIC_OR_CHARACTER_BEFORE_CAPITAL_REGEX;

  return string.split(regex).filter(Boolean);
}
