import type { Stringifiable } from "~/strings/types";
import { mapReplace } from "./mapReplace";

export const unnaccentLigatures = [
  // "ﬁ" and similar ligatures are replaced by the NFKD normalization
  // The only manual replacements are the ones above as they are the "wrong" replacements
  ["Œ", "Oe"],
  ["œ", "oe"],
  ["Æ", "Ae"],
  ["æ", "ae"],
  ["ß", "ss"],
] as const;

export function unaccent(str: Stringifiable): string {
  return (
    mapReplace(str, unnaccentLigatures)
      .normalize("NFKD")
      // combining diacritical marks Unicode range
      .replace(/[\u0300-\u036f]/g, "")
  );
}
