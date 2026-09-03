import type { Fn } from "~/functions/types";
import { isFunction } from "./isFunction";

/**
 * Returns a boolean whether the function is a generator.
 * If the value is not a function, it returns false.
 */
export function isGeneratorFunction(fn: Fn | unknown): fn is GeneratorFunction {
  return isFunction(fn) && fn.constructor.name === "GeneratorFunction";
}
