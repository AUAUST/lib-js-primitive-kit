import type { IfNever } from "type-fest";
import { isArray } from "./isArray";

export function wrap<T>(
  value: T
): T extends any[] ? T : IfNever<NonNullable<T>, [], T[]> {
  if (value === undefined || value === null) {
    return <any>[];
  }

  return <any>(isArray(value) ? value : [value]);
}
