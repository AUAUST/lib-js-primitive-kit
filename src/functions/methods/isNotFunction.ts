import type { Fn } from "../types";

/**
 * Is-not-function check. Returns `true` for any value that is not a function.
 */
export function isNotFunction<const T>(value: T): value is Exclude<T, Fn> {
  return typeof value !== "function";
}
