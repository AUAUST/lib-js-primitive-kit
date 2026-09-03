import type { Stringifiable } from "~/strings/types";
import { toString } from "./toString";

/**
 * Returns the substring before the last occurrence of a specified substring.
 * If the substring is not found, returns an empty string.
 */
export function beforeLast(str: Stringifiable, substring: Stringifiable) {
  const s1 = toString(str);
  const s2 = toString(substring);
  const i = s1.lastIndexOf(s2);

  if (i === -1) {
    return "";
  }

  return s1.slice(0, i);
}
