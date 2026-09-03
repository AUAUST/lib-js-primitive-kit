import type { Fn } from "~/functions/types";
import { isFunction } from "./isFunction";

/**
 * Returns a boolean whether the function is an async generator.
 * If the value is not a function, it returns false.
 */
export function isAsyncGeneratorFunction(
  fn: Fn | unknown,
): fn is AsyncGeneratorFunction {
  return isFunction(fn) && fn.constructor.name === "AsyncGeneratorFunction";
}
