import type { Fn } from "~/functions/types";

export function isFunction(fn: Fn | unknown): fn is Fn {
  return typeof fn === "function";
}
