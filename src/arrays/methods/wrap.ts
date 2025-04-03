import { isArray } from "./isArray";

// `unknown[]` is a more convenient return type than `[]`
// as it allows further working with the array.
export function wrap(value: null | undefined | never): unknown[];

// This return type instead of `T extends any[] ? T : T[]` is to avoid
// the return type to be a union of arrays. Made this way, `wrap(x as string | number)`
// will return `(string | number)[]` instead of `string[] | number[]`.
export function wrap<T>(
  value: T | null | undefined
): [T] extends [any[]] ? T : T[];

export function wrap(value: unknown): unknown[] {
  if (value === undefined || value === null) {
    return [];
  }

  return isArray(value) ? value : [value];
}
