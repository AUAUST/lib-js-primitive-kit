import type { Stringifiable } from "~/strings/types";
import { nthIndexOf } from "./nthIndexOf";
import { toString } from "./toString";

export function splitNth(
  str: Stringifiable,
  separator: Stringifiable,
  nth: number
): [string, string] {
  const s1 = toString(str);
  const s2 = toString(separator);
  const i = nthIndexOf(s1, s2, nth);

  if (i === -1) {
    return [s1, ""];
  }

  return [s1.slice(0, i), s1.slice(i + s2.length)];
}
