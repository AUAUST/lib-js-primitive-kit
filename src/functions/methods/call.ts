import type { IfUncertain } from "~/arrays/types";
import type { Fn } from "~/functions/types";
import { isFunction } from "./isFunction";

export function call<T extends Fn>(
  fn: T,
  fallback?: unknown,
  ...args: Parameters<T>
): ReturnType<T>;
export function call<T, F = undefined>(
  fn: T,
  fallback?: F,
  ...args: T extends Fn ? Parameters<T> : unknown[]
): IfUncertain<T, unknown, ReturnType<T & Fn> | F>;
export function call<T, F = undefined>(
  fn: T,
  fallback?: F,
  ...args: T extends Fn ? Parameters<T> : unknown[]
): ReturnType<T & Fn> | F {
  return isFunction(fn) ? fn(...args) : fallback!;
}
