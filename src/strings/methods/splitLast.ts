import type { Stringifiable } from "~/strings/types";
import { toString } from "./toString";

export function splitLast(
  str: Stringifiable,
  separator: Stringifiable
): [string, string] {
  const s1 = toString(str);
  const s2 = toString(separator);
  const i = s1.lastIndexOf(s2);

  if (i === -1) {
    return [s1, ""];
  }

  return [s1.slice(0, i), s1.slice(i + s2.length)];
}
