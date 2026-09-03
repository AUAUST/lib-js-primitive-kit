import type { AsyncFn, Fn } from "~/functions/types";
import { isFunction } from "./isFunction";

/**
 * Returns a boolean whether the function is async.
 * If the value is not a function, it returns false.
 */
export function isAsyncFunction(fn: Fn | unknown): fn is AsyncFn {
  return isFunction(fn) && fn.constructor.name === "AsyncFunction";
}
