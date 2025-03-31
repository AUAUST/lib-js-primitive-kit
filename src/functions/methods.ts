import type { IfNever } from "type-fest";
import type { IfUncertain } from "~/arrays/types";
import type { AsyncFn, Fn } from "~/functions/types";

export function toFunction<T extends Fn>(value: T): T;
export function toFunction<T>(value: T): () => T;
export function toFunction(value: unknown): Fn {
  return isFunction(value) ? value : () => value;
}

export function isFunction(fn: Fn | unknown): fn is Fn {
  return typeof fn === "function";
}

export function isAsyncFunction(fn: Fn | unknown): fn is AsyncFn {
  return isFunction(fn) && fn.constructor.name === "AsyncFunction";
}

export function isGeneratorFunction(fn: Fn | unknown): fn is GeneratorFunction {
  return isFunction(fn) && fn.constructor.name === "GeneratorFunction";
}

export function isAsyncGeneratorFunction(
  fn: Fn | unknown
): fn is AsyncGeneratorFunction {
  return isFunction(fn) && fn.constructor.name === "AsyncGeneratorFunction";
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

export function identity<T>(): undefined;
export function identity<T>(value: T): T;
export function identity<T>(value?: T): T | undefined {
  return value;
}

export function noop(...ignored: any[]): void {}

export function or<T>(
  ...args: T[]
): IfNever<Extract<T, Fn>, Fn, Extract<T, Fn>>;
export function or(...args: unknown[]): Fn;
export function or(...args: unknown[]): Fn {
  for (let arg of args) if (isFunction(arg)) return arg;
  return noop;
}

export type OnceFn<T> = (() => T) & {
  /** Clears the cached return value of the function and make the next call trigger the function again. */
  reset(): void;
} & (
    | {
        /** Allows to access the return value of the function without calling it if it wasn't called yet. */
        readonly value: T;
        /** Returns true if the function was already called. */
        readonly called: true;
      }
    | {
        readonly value: T | undefined;
        readonly called: false;
      }
  );

export function once<T>(fn: () => T): OnceFn<T> {
  let value: T | undefined;
  let called = false;

  const accessor = () => (called ? value! : ((called = true), (value = fn())));

  accessor.reset = () => {
    called = false;
    value = undefined;
  };

  Object.defineProperty(accessor, "value", {
    get: () => value,
  });

  Object.defineProperty(accessor, "called", {
    get: () => called,
  });

  return <OnceFn<T>>accessor;
}
