import { defineMethod } from "~/compiler";
import type { AsyncFn, Fn } from "~/functions/types";
import { isFunction } from "./isFunction";

export default defineMethod({
  methodAliases: ["isAsync"],
  instanceCallable: true,
});

/**
 * Returns a boolean whether the function is async.
 * If the value is not a function, it returns false.
 */
export function isAsyncFunction(fn: Fn | unknown): fn is AsyncFn {
  return isFunction(fn) && fn.constructor.name === "AsyncFunction";
}
