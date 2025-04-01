import type { Stringifiable } from "~/strings/types";
import { toString } from "./toString";

export function nthIndexOf(
  str: Stringifiable,
  substring: Stringifiable,
  nth: number
): number {
  const s1 = toString(str);
  const s2 = toString(substring);

  let i: number;

  if (nth < 0) {
    i = s1.length;

    for (let n = 0; n > nth; n--) {
      i = s1.lastIndexOf(s2, i - 1);

      if (i === -1) {
        return -1;
      }
    }
  } else {
    i = -1;

    for (let n = -1; n < nth; n++) {
      i = s1.indexOf(s2, i + 1);

      if (i === -1) {
        return -1;
      }
    }
  }

  return i;
}
