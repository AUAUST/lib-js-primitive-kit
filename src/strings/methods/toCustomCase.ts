import type { Stringifiable } from "~/strings/types";
import { capitalize } from "./capitalize";
import { isString } from "./isString";
import { splitWords } from "./splitWords";
import { toString } from "./toString";
import { unaccent } from "./unaccent";

export function toCustomCase(
  str: Stringifiable,
  options:
    | {
        /**
         * The string with which to separate the words in the output.
         */
        separator?: string;
        wordCase?: "lower" | "upper" | "capital" | "keep";
        firstWordCase?: "lower" | "upper" | "capital" | "keep" | "match";
        /**
         * If true,  a capital letter won't be considered as a word boundary.
         */
        ignoreCaps?: boolean;
        /**
         * If true, accents will be removed from the string before processing.
         */
        unaccent?: boolean;
      }
    | string
): string {
  const {
    separator,
    wordCase,
    firstWordCase,
    ignoreCaps,
    unaccent: unaccented,
  } = isString(options)
    ? {
        separator: toString(options),
        wordCase: "keep",
        firstWordCase: "match",
        ignoreCaps: undefined, // for TS
        unaccent: undefined, // for TS
      }
    : {
        separator: "",
        wordCase: "keep",
        firstWordCase: "match",
        ...options,
      };

  const toCase = (word: string, index: number): string => {
    switch (index === 0 ? firstWordCase : wordCase) {
      case "lower":
        return word.toLowerCase();
      case "upper":
        return word.toUpperCase();
      case "capital":
        return capitalize(word);
      case "keep":
        return word;
    }

    // If none matched, it's either:
    // - the first index and firstWordCase is "match", so we return the word as it would be handled as a non-first word
    // - a wrong input, so we return the word as it is
    return index === 0 ? toCase(word, -1) : word;
  };

  if (unaccented) {
    str = unaccent(str);
  }

  return splitWords(str, ignoreCaps).map(toCase).join(separator);
}
