import type { Stringifiable, ToString } from "~/strings/types";
import { toString } from "./toString";

export type BeforeEnd<T extends Stringifiable, U extends Stringifiable> =
  ToString<T> extends `${infer R}${ToString<U>}` ? R : string;

/**
 * Returns the substring before the first occurrence of a specified substring, only if the substring is at the end of the string.
 * If the substring isn't found at the end of the string, returns an empty string.
 */
export function beforeEnd<T extends Stringifiable, U extends Stringifiable>(
  str: T,
  substring: U,
): BeforeEnd<T, U>;
export function beforeEnd(str: Stringifiable, substring: Stringifiable): string;
export function beforeEnd(
  str: Stringifiable,
  substring: Stringifiable,
): string {
  const s1 = toString(str);
  const s2 = toString(substring);

  if (!s1.endsWith(s2)) {
    return "";
  }

  return s1.slice(0, s1.length - s2.length);
}
