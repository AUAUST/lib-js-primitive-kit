import type { IfNever } from "type-fest";
import type { Fn } from "~/functions/types";
import { isFunction } from "./isFunction";
import { noop } from "./noop";

export function or<T>(
  ...args: T[]
): IfNever<Extract<T, Fn>, Fn, Extract<T, Fn>>;
export function or(...args: unknown[]): Fn;
export function or(...args: unknown[]): Fn {
  for (let arg of args) if (isFunction(arg)) return arg;
  return noop;
}
