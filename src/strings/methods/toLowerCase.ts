import { defineMethod } from "~/compiler";
import type { Stringifiable, ToString } from "~/strings/types";
import { toString } from "./toString";

export default defineMethod({
  staticAliases: ["lower"],
  helperAliases: ["lower"],
  instanceCallable: "chainable",
});

/**
 * Converts all the alphabetic characters in a string to lowercase.
 */
export function toLowerCase<T extends Stringifiable>(
  str: T,
): Lowercase<ToString<T>>;
export function toLowerCase(str: unknown): Lowercase<string>;
export function toLowerCase(str: unknown): string {
  return toString(str).toLowerCase();
}
