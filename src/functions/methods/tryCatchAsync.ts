import type { Fn } from "~/functions/types";

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
