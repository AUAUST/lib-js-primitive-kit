import type { Writable } from "~/objects/types";
import type { Arrayable } from "../types";
import { isArray } from "./isArray";
import { type ToArray, toArray } from "./toArray";

export function toCopiedArray(input?: null | undefined): unknown[];
export function toCopiedArray<T>(
  length: number,
  mapFn?: (v: undefined, k: number) => T
): T[];
export function toCopiedArray<T extends readonly any[]>(arr: T): Writable<T>;
export function toCopiedArray<T extends Arrayable>(arrayLike: T): ToArray<T>;
export function toCopiedArray(
  arrayOrLength: Arrayable,
  mapFn: (v: undefined, k: number) => unknown
): unknown[];
export function toCopiedArray(
  input?: Arrayable,
  mapFn?: (v: undefined, k: number) => unknown
): unknown[] {
  return isArray(input)
    ? // If the input is an array, we copy it
      input.slice()
    : // Otherwise, the `toArray` function already returns a new array (which we don't want to copy again)
      toArray(input, mapFn);
}
