import type { Fn } from "~/functions/types";
import type { IfNever } from "~/shared/types";
import { isFunction } from "./isFunction";
import { noop } from "./noop";

/**
 * Returns the first argument that is a function, or noop if none is found.
 */
export function or<T>(
  ...args: T[]
): IfNever<Extract<T, Fn>, Fn, Extract<T, Fn>>;
export function or(...args: unknown[]): Fn;
export function or(...args: unknown[]): Fn {
  for (let arg of args) if (isFunction(arg)) return arg;
  return noop;
}
