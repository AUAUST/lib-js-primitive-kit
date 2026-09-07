import { defineMethod } from "~/compiler";
import type { Fn, ToFunction } from "../types";
import { constant } from "./constant";
import { isFunction } from "./isFunction";

export default defineMethod({
  methodAliases: ["from"],
});

/**
 * If the value is a function, returns it.
 * If the value is not a function, returns a function that returns the value.
 */
export function toFunction<const T extends Fn>(value: T): T;
export function toFunction<const T = undefined>(value?: T): ToFunction<T>;
export function toFunction(value: unknown): Fn {
  return isFunction(value) ? value : constant(value);
}
