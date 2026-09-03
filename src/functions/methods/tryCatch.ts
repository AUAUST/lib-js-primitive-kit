import type { Fn } from "~/functions/types";

/** Runs a function in a try-catch block, passing down the arguments and returning either the return value or the fallback value. */
export function tryCatch<T extends Fn, F = undefined>(
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
