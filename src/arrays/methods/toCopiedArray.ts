import { defineMethod } from "~/compiler";
import type { Writable } from "~/shared/types";
import type { Arrayable } from "../types";
import { isArray } from "./isArray";
import type { ToArray } from "~/arrays/types";
import { toArray } from "./toArray";

export default defineMethod({
  methodAliases: ["copy"],
  instanceCallable: true,
});

/**
 * Returns a new array with the same values as the original.
 * Non-array iterables are converted to arrays. Arrays are shallow-copied.
 */
export function toCopiedArray(input?: null | undefined): unknown[];
export function toCopiedArray<const T>(
  length: number,
  mapFn?: (v: undefined, k: number) => T,
): T[];
export function toCopiedArray<const T extends readonly any[]>(arr: T): Writable<T>;
export function toCopiedArray<const T extends Arrayable>(arrayLike: T): ToArray<T>;
export function toCopiedArray(
  arrayOrLength: Arrayable,
  mapFn: (v: undefined, k: number) => unknown,
): unknown[];
export function toCopiedArray(
  input?: Arrayable,
  mapFn?: (v: undefined, k: number) => unknown,
): unknown[] {
  return isArray(input)
    ? // If the input is an array, we copy it
      input.slice()
    : // Otherwise, the `toArray` function already returns a new array (which we don't want to copy again)
      toArray(input, mapFn);
}
