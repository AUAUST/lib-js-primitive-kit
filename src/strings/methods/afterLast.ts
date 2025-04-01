import type { Stringifiable } from "~/strings/types";
import { toString } from "./toString";

export function afterLast(
  str: Stringifiable,
  substring: Stringifiable
): string {
  const s1 = toString(str);
  const s2 = toString(substring);
  const i = s1.lastIndexOf(s2);

  if (i === -1) {
    return "";
  }

  return s1.slice(i + s2.length);
}
