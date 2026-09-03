import { isArray } from "~/arrays/methods";

/** Returns exactly the same as Object.values(), but strongly types the return value. */
export function values<T>(obj: Record<PropertyKey, T> | null | undefined): T[];
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
