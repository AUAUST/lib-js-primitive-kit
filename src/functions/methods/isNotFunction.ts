import type { Fn } from "../types";

export function isNotFunction<T>(value: T): value is Exclude<T, Fn> {
  return typeof value !== "function";
}
