import { defineMethod } from "~/compiler";
import type { Stringifiable, ToString } from "~/strings/types";
import { toString } from "./toString";

export default defineMethod({
  methodAliases: ["upper"],
  helperAliases: ["upper"],
  instanceCallable: "chainable",
});

/**
 * Converts all the alphabetic characters in a string to uppercase.
 */
export function toUpperCase<const T extends Stringifiable>(
  str: T,
): Uppercase<ToString<T>>;
export function toUpperCase(str: unknown): Uppercase<string>;
export function toUpperCase(str: unknown): string {
  return toString(str).toUpperCase();
}
