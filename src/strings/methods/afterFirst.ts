import { defineMethod } from "~/compiler";
import type { AfterFirst, Stringifiable } from "~/strings/types";
import { toString } from "./toString";

export default defineMethod({
  methodAliases: ["after"],
  helperAliases: ["after"],
  instanceCallable: "chainable",
});

/**
 * Returns the substring after the first occurrence of a specified substring.
 * If the substring is not found, returns an empty string.
 */
export function afterFirst<
  const T extends Stringifiable,
  const U extends Stringifiable,
>(
  str: T,
  substring: U,
): AfterFirst<T, U>;
export function afterFirst(
  str: Stringifiable,
  substring: Stringifiable,
): string;
export function afterFirst(
  str: Stringifiable,
  substring: Stringifiable,
): string {
  const s1 = toString(str);
  const s2 = toString(substring);
  const i = s1.indexOf(s2);

  if (i === -1) {
    return "";
  }

  return s1.slice(i + s2.length);
}
