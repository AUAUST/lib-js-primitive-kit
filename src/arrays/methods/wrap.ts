import { isArray } from "./isArray";

/** Wraps the passed value in an array. If the value is nullish, an empty array is returned. If the value is already an array, it is returned as is. */
export function wrap(value?: null | undefined | never): unknown[];
export function wrap<T>(
  value: T | null | undefined,
): T extends readonly any[] ? T : T[];
export function wrap(value: unknown): unknown[] {
  if (value === undefined || value === null) {
    return [];
  }

  return isArray(value) ? value : [value];
}
