import type { Fn } from "~/functions/types";
import { isFunction } from "./isFunction";

export function isGeneratorFunction(fn: Fn | unknown): fn is GeneratorFunction {
  return isFunction(fn) && fn.constructor.name === "GeneratorFunction";
}
