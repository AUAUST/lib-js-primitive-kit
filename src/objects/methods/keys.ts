import { isArray } from "~/arrays/methods";
import { defineMethod } from "~/compiler";
import type { IfNever } from "~/shared/types";
import type { GenericRecord } from "../types";

export default defineMethod({
  instanceCallable: true,
});

export function keys<T extends GenericRecord>(
  obj: T,
): IfNever<keyof T, string[], (keyof T & (string | number))[]>;
export function keys(obj: null | undefined): (string | number)[];
export function keys(obj: any[]): number[];
export function keys(obj: any[] | null | undefined): number[];
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
