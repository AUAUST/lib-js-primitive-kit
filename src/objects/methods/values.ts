import { isArray } from "~/arrays/methods";
import { defineMethod } from "~/compiler";
import type { GenericRecord } from "~/shared/types";

export default defineMethod({
  instanceCallable: true,
});

/**
 * Returns exactly the same as Object.values(), but strongly types the return value.
 */
export function values<const T extends GenericRecord>(obj: T): T[keyof T][];
export function values(obj: null | undefined): unknown[];
export function values(obj: unknown[]): unknown[];
export function values(obj: unknown): unknown[];
export function values(obj: unknown): unknown[] {
  if (!obj) {
    return [];
  }

  if (isArray(obj)) {
    return obj;
  }

  return Object.values(obj);
}
