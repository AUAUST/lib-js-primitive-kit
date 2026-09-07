import type { Arrayable, ToArray } from "~/arrays/types";
import { defineMethod } from "~/compiler";
import { isNumber } from "~/numbers/methods";
import { isNullish } from "~/primitives/methods";
import { isArray } from "./isArray";

export default defineMethod({
  methodAliases: ["from"],
});

/**
 * Converts any value to an array.
 * `null` and `undefined` are converted to empty arrays.
 * Numbers are used to create arrays of a specific length.
 * Everything else uses the native `Array.from()`.
 */
export function toArray(input?: null | undefined): unknown[];
export function toArray<const T>(
  length: number,
  mapFn?: (v: undefined, k: number) => T,
): T[];
export function toArray<const T extends Arrayable>(arrayLike: T): ToArray<T>;
export function toArray<const R = unknown>(
  arrayOrLength: unknown,
  mapFn?: (v: undefined, k: number) => R,
): R[];
export function toArray(
  arrayOrLength?: unknown,
  mapFn?: (v: undefined, k: number) => unknown,
): unknown[] {
  if (isNullish(arrayOrLength)) {
    return [];
  }

  if (isArray(arrayOrLength)) {
    return arrayOrLength;
  }

  if (isNumber(arrayOrLength)) {
    return Array.from({ length: arrayOrLength }, mapFn!);
  }

  return Array.from(<any>arrayOrLength, mapFn!);
}
