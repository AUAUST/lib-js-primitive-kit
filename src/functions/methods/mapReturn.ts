import { defineMethod } from "~/compiler";
import type { Fn } from "~/functions/types";

export default defineMethod({
  instanceCallable: "chainable",
});

/**
 * Creates a function that maps another function's return value.
 */
export function mapReturn<const T extends Fn, const Result>(
  fn: T,
  mapper: (value: ReturnType<T>) => Result,
): Fn<Parameters<T>, Result>;
export function mapReturn(fn: Fn, mapper: Fn) {
  return function (this: any, ...args: any[]) {
    return mapper.call(this, fn.apply(this, args));
  };
}
