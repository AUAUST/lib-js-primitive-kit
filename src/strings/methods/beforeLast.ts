import type { Stringifiable } from "~/strings/types";
import { toString } from "./toString";

export function beforeLast(str: Stringifiable, substring: Stringifiable) {
  const s1 = toString(str);
  const s2 = toString(substring);
  const i = s1.lastIndexOf(s2);

  if (i === -1) {
    return "";
  }

  return s1.slice(0, i);
}
