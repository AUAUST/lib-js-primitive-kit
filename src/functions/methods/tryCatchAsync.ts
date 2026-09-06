import type { Fn } from "~/functions/types";

/**
 * Runs and awaits an async function in a try-catch block, passing down the arguments and returning either the return value or the fallback value.
 */
export async function tryCatchAsync<T extends Fn, F = undefined>(
  fn: T,
  fallback?: F,
  ...args: Parameters<T>
): Promise<ReturnType<T> | F> {
  try {
    return await fn(...args);
  } catch {
    return fallback!;
  }
}
