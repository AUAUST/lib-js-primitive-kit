import type { Stringifiable } from "~/strings/types";
import { toString } from "./toString";

export function truncateEnd(
  str: Stringifiable,
  length: number,
  ellipsis?: Stringifiable
) {
  const s = toString(str);
  const ell = toString(ellipsis);

  if (s.length <= length) {
    return s;
  }

  if (ell.length >= length) {
    throw new RangeError(
      "S.truncateEnd() requires the length of the ellipsis to be shorter than the maximum length of the string."
    );
  }

  return s.slice(0, length - ell.length) + ell;
}
