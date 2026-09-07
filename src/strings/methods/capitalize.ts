import { defineMethod } from "~/compiler";
import type { Stringifiable, ToString } from "~/strings/types";
import { toString } from "./toString";

export default defineMethod({
  instanceCallable: "chainable",
});

/**
 * Capitalizes the first letter of a string, letting the rest as-is.
 * I.e. "hello world" becomes "Hello world", "HTML" stays "HTML", "hTML" becomes "HTML".
 */
export function capitalize<const T extends Stringifiable>(
  str: T,
): Capitalize<ToString<T>>;
export function capitalize(str: unknown): Capitalize<string>;
export function capitalize(str: unknown): string {
  const s = toString(str);
  return s.charAt(0).toUpperCase() + s.slice(1);
}
