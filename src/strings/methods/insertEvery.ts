import type { Stringifiable } from "~/strings/types";
import { chunk } from "./chunk";
import { toString } from "./toString";

export function insertEvery(
  str: Stringifiable,
  substring: Stringifiable,
  interval: number = 1,
  offset: number = 0
): string {
  const s1 = toString(str);

  if (!s1 || !interval) {
    return s1;
  }

  const s2 = toString(substring);

  if (!s2) {
    return s1;
  }

  const chunks = chunk(s1, interval, offset);

  if (offset !== 0) {
    if (interval > 0) {
      chunks.unshift(s1.slice(0, offset));
    } else {
      chunks.push(s1.slice(s1.length + offset + 1));
    }
  }

  return chunks.join(s2);
}
