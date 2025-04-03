import { isArray } from "~/arrays/methods";
import type { ObjectType } from "../types";

export function entries(obj: null | undefined | never): [string, unknown][];
export function entries<T>(obj: T[]): [number, T][];
export function entries<T extends ObjectType>(
  obj: T
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
