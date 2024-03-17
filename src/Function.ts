import type { Fn } from "~/types/Function";

/**
 * The F class, for Function, provides useful methods for working with functions.
 */
class F extends Function {
  /**
   * A simple is-function check.
   * Returns the result of `typeof x === "function"`.
   */
  static is(x: any): x is Fn {
    return typeof x === "function";
  }

  /**
   * A strict is-function check.
   */

  /**
   * Returns a boolean whether the function is async.
   * If the value is not a function, it returns false.
   */
  static isAsync(fn: Fn): boolean {
    return typeof fn === "function" && fn.constructor.name === "AsyncFunction";
  }

  /**
   * Returns a boolean whether the function is a generator.
   * If the value is not a function, it returns false.
   */
  static isGenerator(fn: Fn): boolean {
    return (
      typeof fn === "function" && fn.constructor.name === "GeneratorFunction"
    );
  }

  /**
   * Runs a function in a try-catch block, passing down the arguments and returning either the return value or the fallback value.
   */
  static try<T extends Fn, F = undefined>(
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

  /**
   * Runs and awaits an async function in a try-catch block, passing down the arguments and returning either the return value or the fallback value.
   */
  static async tryAsync<T extends Fn, F = undefined>(
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

  /**
   * Runs the passed value only if it is callable. If the value's not a function, returns the fallback value.
   * The execution is not wrapped in a try-catch block, so it will throw if the function errors.
   */
  static call<T, F = undefined>(
    fn: T,
    fallback?: F,
    ...args: T extends Fn ? Parameters<T> : unknown[]
  ): T extends Fn ? ReturnType<T> : F {
    return F.is(fn) ? fn(...args) : fallback;
  }
}

export { F };
export type { Fn as TFun };
