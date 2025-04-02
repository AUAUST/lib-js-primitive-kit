import type { Fn } from "~/functions/types";
import { isFunction } from "./isFunction";

export function isAsyncGeneratorFunction(
  fn: Fn | unknown
): fn is AsyncGeneratorFunction {
  return isFunction(fn) && fn.constructor.name === "AsyncGeneratorFunction";
}
