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
    return fn(...args) as any;
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
    return (await fn(...args)) as any;
  } catch {
    return fallback!;
  }
}

export function call<T, F = undefined>(
  fn: T,
  fallback?: F,
  ...args: T extends Fn ? Parameters<T> : unknown[]
): T extends Fn ? ReturnType<T> : F {
  return isFunction(fn) ? (fn(...args) as any) : fallback;
}
