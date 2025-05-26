import type { Fn } from "../types";
import { constant } from "./constant";
import { isFunction } from "./isFunction";

export function toFunction<T extends Fn>(value: T): T;
export function toFunction<T = undefined>(
  value?: T
): T extends Fn ? T : () => T;
export function toFunction(value: unknown): Fn {
  return isFunction(value) ? value : constant(value);
}
