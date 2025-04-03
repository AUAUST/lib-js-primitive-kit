import type { IfNever } from "type-fest";
import { isArray } from "~/arrays/methods";

export function keys<T extends any[]>(obj: T | null | undefined): number[];
export function keys<T extends PropertyKey>(
  obj: Record<T, unknown> | null | undefined
): IfNever<T, string[], T[]>;
export function keys(obj: unknown): (string | number)[];
export function keys(obj: unknown): (string | number)[] {
  if (!obj) {
    return [];
  }

  if (isArray(obj)) {
    return Array.from(obj.keys());
  }

  return Object.keys(obj);
}
