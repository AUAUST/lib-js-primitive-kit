import type { Fn } from "~/functions/types";

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
