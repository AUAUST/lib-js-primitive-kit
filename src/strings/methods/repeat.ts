import { defineMethod } from "~/compiler";
import type { Stringifiable, ToString } from "~/strings/types";
import { toString } from "./toString";

export default defineMethod({
  instanceCallable: "chainable",
});

/**
 * Repeats a string the specified number of times.
 */
export function repeat<const T extends Stringifiable>(
  str: T,
  count: number,
): `${string}${ToString<T>}${string}`;
export function repeat(str: Stringifiable, count: number): string;
export function repeat(str: Stringifiable, count: number): string {
  return toString(str).repeat(count);
}
