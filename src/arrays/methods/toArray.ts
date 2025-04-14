import type { Arrayable } from "~/arrays/types";
import { isNumber } from "~/numbers/methods";
import { isNullish } from "~/primitives/methods";
import { isArray } from "./isArray";

/** Converts iterable values to arrays. */
export type ToArray<T> = T extends string
  ? string[]
  : T extends number | null | undefined
  ? unknown[]
  : T extends ArrayLike<infer U>
  ? U[]
  : T extends Iterable<infer U>
  ? U[]
  : never;

export function toArray(input?: null | undefined): unknown[];
export function toArray<T>(
  length: number,
  mapFn?: (v: undefined, k: number) => T
): T[];
export function toArray<T extends Arrayable>(arrayLike: T): ToArray<T>;
export function toArray<R = unknown>(
  arrayOrLength: Arrayable,
  mapFn?: (v: undefined, k: number) => R
): R[];
export function toArray(
  arrayOrLength?: Arrayable,
  mapFn?: (v: undefined, k: number) => unknown
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

  return Array.from(arrayOrLength, mapFn!);
}
