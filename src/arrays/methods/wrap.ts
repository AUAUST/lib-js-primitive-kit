import { isArray } from "./isArray";

// `unknown[]` is a more convenient return type than `[]`
// as it allows further working with the array.
export function wrap(value: null | undefined | never): unknown[];
export function wrap<T>(value: T | null | undefined): T extends any[] ? T : T[];
export function wrap(value: unknown): unknown[] {
  if (value === undefined || value === null) {
    return [];
  }

  return isArray(value) ? value : [value];
}
