import type { Stringifiable } from "~/strings/types";
import { toString } from "./toString";

export function chunk(
  str: Stringifiable,
  size: number,
  offset: number = 0
): string[] {
  const s = toString(str);

  if (!size || typeof size !== "number") {
    return [s];
  }

  const forwards = size > 0;

  size = Math.abs(size);
  offset = offset < 0 ? s.length + offset : offset;

  if (forwards) {
    const chunks: string[] = [];

    for (let i = offset; i < s.length; i += size) {
      chunks.push(s.slice(i, i + size));
    }

    return chunks;
  }

  const chunks: string[] = [];

  for (let i = s.length - size - offset; i >= 0; i -= size) {
    chunks.unshift(s.slice(i, i + size));
  }

  // If the string length is not a multiple of size, we need to add the remaining characters
  // at the beginning of the array. This ensure no part of the string gets lost in the process.
  const overflow = (s.length - offset) % size;

  if (overflow > 0) {
    chunks.unshift(s.slice(0, overflow));
  }

  return chunks;
}
