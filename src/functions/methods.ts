import type { IfUncertain } from "~/arrays/types";
import type { AsyncFn, Fn } from "~/functions/types";

export function isFunction(fn: Fn | unknown): fn is Fn {
  return typeof fn === "function";
}

export function isAsyncFunction(fn: Fn | unknown): fn is AsyncFn {
  return typeof fn === "function" && fn.constructor.name === "AsyncFunction";
}

export function isGeneratorFunction(fn: Fn | unknown): fn is GeneratorFunction {
  return (
    typeof fn === "function" && fn.constructor.name === "GeneratorFunction"
  );
}

export function isAsyncGeneratorFunction(
  fn: Fn | unknown
): fn is AsyncGeneratorFunction {
  return (
    typeof fn === "function" && fn.constructor.name === "AsyncGeneratorFunction"
  );
}

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

export function call<T extends Fn>(
  fn: T,
  fallback?: unknown,
  ...args: Parameters<T>
): ReturnType<T>;
export function call<T, F = undefined>(
  fn: T,
  fallback?: F,
  ...args: T extends Fn ? Parameters<T> : unknown[]
): IfUncertain<T, unknown, ReturnType<T & Fn> | F>;
export function call<T, F = undefined>(
  fn: T,
  fallback?: F,
  ...args: T extends Fn ? Parameters<T> : unknown[]
): ReturnType<T & Fn> | F {
  return isFunction(fn) ? fn(...args) : fallback!;
}
