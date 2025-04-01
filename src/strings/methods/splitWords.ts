import { casingOptions, type CasingOptions } from "~/strings/helpers";
import type { Stringifiable } from "~/strings/types";
import { toString } from "./toString";
import { unaccent } from "./unaccent";

export function splitWords(
  str: Stringifiable,
  options?: CasingOptions
): string[] {
  const { ignoreCaps, unaccent: unaccented } = casingOptions(options);
  const s = unaccented ? unaccent(str) : toString(str);
  const regex = ignoreCaps
    ? /[^\p{L}\d]+/gu // will match all non-alphanumeric characters
    : /[^\p{L}\d]+|(?=[\p{Lu}])/gu; // will match all non-alphanumeric characters AND positions before a capital letter

  return s.split(regex).filter(Boolean);
}
