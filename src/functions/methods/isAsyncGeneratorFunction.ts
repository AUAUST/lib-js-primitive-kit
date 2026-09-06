import { defineMethod } from "~/compiler";
import type { Fn } from "~/functions/types";
import { isFunction } from "./isFunction";

export default defineMethod({
  methodAliases: ["isAsyncGenerator"],
  instanceCallable: true,
});

/**
 * Returns a boolean whether the function is an async generator.
 * If the value is not a function, it returns false.
 */
export function isAsyncGeneratorFunction(
  fn: Fn | unknown,
): fn is AsyncGeneratorFunction {
  return isFunction(fn) && fn.constructor.name === "AsyncGeneratorFunction";
}
