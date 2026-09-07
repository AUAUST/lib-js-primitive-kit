import { defineMethod } from "~/compiler";
import type { Fn } from "~/functions/types";

export default defineMethod({
  methodAliases: ["tryAsync"],
});

/**
 * Runs and awaits an async function in a try-catch block, passing down the arguments and returning either the return value or the fallback value.
 */
export async function tryCatchAsync<const T extends Fn, const F = undefined>(
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
