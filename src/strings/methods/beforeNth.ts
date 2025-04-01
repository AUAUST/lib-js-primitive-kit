import type { Stringifiable } from "~/strings/types";
import { nthIndexOf } from "./nthIndexOf";
import { toString } from "./toString";

export function beforeNth(
  str: Stringifiable,
  substring: Stringifiable,
  nth: number
): string {
  const s1 = toString(str);
  const s2 = toString(substring);
  const i = nthIndexOf(s1, s2, nth);

  if (i === -1) {
    return "";
  }

  return s1.slice(0, i);
}
