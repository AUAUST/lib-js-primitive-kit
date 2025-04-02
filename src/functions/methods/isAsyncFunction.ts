import type { AsyncFn, Fn } from "~/functions/types";
import { isFunction } from "./isFunction";

export function isAsyncFunction(fn: Fn | unknown): fn is AsyncFn {
  return isFunction(fn) && fn.constructor.name === "AsyncFunction";
}
