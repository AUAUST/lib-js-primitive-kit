import { defineMethod } from "~/compiler";
import type { Stringifiable } from "~/strings/types";
import { mapReplace } from "./mapReplace";

export default defineMethod({
  instanceCallable: "chainable",
});

const unnaccentLigatures = [
  // "ﬁ" and similar ligatures are replaced by the NFKD normalization
  // The only manual replacements are the ones above as they are the "wrong" replacements
  ["Œ", "Oe"],
  ["œ", "oe"],
  ["Æ", "Ae"],
  ["æ", "ae"],
  ["ß", "ss"],
] as const;

/**
 * Removes accents from a string. Useful for i.e. URL slugs.
 * `ﬁ` becomes `fi`, `à` becomes `a`, etc.
 *
 * Some characters are also typographically inaccurately replaced, such as `œ` and `æ` becoming `oe` and `ae` respectively.
 * Despite technically being entirely different letters, it's most of the time the expected behavior when unaccenting a string.
 */
export function unaccent(str: Stringifiable): string {
  return (
    mapReplace(str, unnaccentLigatures)
      .normalize("NFKD")
      // combining diacritical marks Unicode range
      .replace(/[\u0300-\u036f]/g, "")
  );
}
