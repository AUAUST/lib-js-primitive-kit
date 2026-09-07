import { defineMethod } from "~/compiler";
import type { BeforeFirst, Stringifiable } from "~/strings/types";
import { toString } from "./toString";

export default defineMethod({
  methodAliases: ["before"],
  helperAliases: ["before"],
  instanceCallable: "chainable",
});

/**
 * Returns the substring before the first occurrence of a specified substring.
 * If the substring is not found, returns an empty string.
 */
export function beforeFirst<
  const T extends Stringifiable,
  const U extends Stringifiable,
>(
  str: T,
  substring: U,
): BeforeFirst<T, U>;
export function beforeFirst(
  str: Stringifiable,
  substring: Stringifiable,
): string;
export function beforeFirst(
  str: Stringifiable,
  substring: Stringifiable,
): string {
  const s1 = toString(str);
  const s2 = toString(substring);
  const i = s1.indexOf(s2);

  if (i === -1) {
    return "";
  }

  return s1.slice(0, i);
}
