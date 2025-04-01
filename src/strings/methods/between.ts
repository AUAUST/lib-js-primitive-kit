import type { Stringifiable } from "~/strings/types";
import { toString } from "./toString";

export function between(
  str: Stringifiable,
  startSubstring: Stringifiable,
  endSubstring: Stringifiable
) {
  const s1 = toString(str);
  const s2 = toString(startSubstring);
  const s3 = toString(endSubstring);
  const i1 = s1.indexOf(s2);
  const i2 = s1.lastIndexOf(s3);

  if (i1 === -1 || i2 === -1) {
    return "";
  }

  return s1.slice(i1 + s2.length, i2);
}
