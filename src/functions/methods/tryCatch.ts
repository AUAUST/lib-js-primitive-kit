import { defineMethod } from "~/compiler";
import type { Fn } from "~/functions/types";

export default defineMethod({
  methodAliases: ["try"],
});

/**
 * Runs a function in a try-catch block, passing down the arguments and returning either the return value or the fallback value.
 */
export function tryCatch<const T extends Fn, const F = undefined>(
  fn: T,
  fallback?: F,
  ...args: Parameters<T>
): ReturnType<T> | F {
  try {
    return fn(...args);
  } catch {
    return fallback!;
  }
}
