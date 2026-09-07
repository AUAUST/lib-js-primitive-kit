import type { Fn } from "~/functions/types";
import type { IfUncertain } from "~/shared/types";
import { isFunction } from "./isFunction";

/**
 * Runs the passed value only if it is callable. If the value's not a function, returns the fallback value.
 * The execution is not wrapped in a try-catch block, so it will throw if the function errors.
 */
export function call<const T extends Fn>(
  fn: T,
  fallback?: unknown,
  ...args: Parameters<T>
): ReturnType<T>;
export function call<const T, const F = undefined>(
  fn: T,
  fallback?: F,
  ...args: T extends Fn ? Parameters<T> : unknown[]
): IfUncertain<T, unknown, ReturnType<T & Fn> | F>;
export function call<const T, const F = undefined>(
  fn: T,
  fallback?: F,
  ...args: T extends Fn ? Parameters<T> : unknown[]
): ReturnType<T & Fn> | F {
  return isFunction(fn) ? fn(...args) : fallback!;
}
