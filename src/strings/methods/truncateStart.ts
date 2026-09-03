import type { Stringifiable } from "~/strings/types";
import { toString } from "./toString";

/**
 * Truncates the left side of a string to the specified length.
 * If the string is longer than the specified length and an ellipsis string is provided,
 * the overhanging characters are replaced by the ellipsis.
 */
export function truncateStart(
  str: Stringifiable,
  length: number,
  ellipsis?: Stringifiable,
) {
  const s = toString(str);
  const ell = toString(ellipsis);

  if (s.length <= length) {
    return s;
  }

  if (ell.length >= length) {
    throw new RangeError(
      "S.truncateStart() requires the length of the ellipsis to be shorter than the maximum length of the string.",
    );
  }

  return ell + s.slice(s.length - length + ell.length);
}
