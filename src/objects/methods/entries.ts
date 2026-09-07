import { isArray } from "~/arrays/methods";
import { defineMethod } from "~/compiler";
import type { GenericRecord } from "../types";

export default defineMethod({
  instanceCallable: true,
});

/**
 * Returns exactly the same as Object.entries(), but strongly types the return value.
 */
export function entries(obj: null | undefined | never): [string, unknown][];
export function entries<const T>(obj: T[]): [number, T][];
export function entries<const T extends GenericRecord>(
  obj: T,
): {
  [K in keyof T]: [K, T[K]];
}[keyof T][];
export function entries(obj: unknown): [PropertyKey, unknown][] {
  if (!obj) {
    return [];
  }

  if (isArray(obj)) {
    return Array.from(obj.entries());
  }

  return Object.entries(obj);
}
