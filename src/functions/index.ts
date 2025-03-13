import {
  call,
  identity,
  isAsyncFunction,
  isAsyncGeneratorFunction,
  isFunction,
  isGeneratorFunction,
  tryCatch,
  tryCatchAsync,
} from "~/functions/methods";
import type { AsyncFn, Fn } from "~/functions/types";

/** The F class, for Function, provides useful methods for working with functions. */
class F extends Function {
  /**
   * A simple is-function check.
   * Returns the result of `typeof x === "function"`.
   */
  static is = isFunction;

  /**
   * Returns a boolean whether the function is async.
   * If the value is not a function, it returns false.
   */
  static isAsync = isAsyncFunction;

  /**
   * Returns a boolean whether the function is a generator.
   * If the value is not a function, it returns false.
   */
  static isGenerator = isGeneratorFunction;

  /**
   * Returns a boolean whether the function is an async generator.
   * If the value is not a function, it returns false.
   */
  static isAsyncGenerator = isAsyncGeneratorFunction;

  /** Runs a function in a try-catch block, passing down the arguments and returning either the return value or the fallback value. */
  static try = tryCatch;

  /** Runs and awaits an async function in a try-catch block, passing down the arguments and returning either the return value or the fallback value. */
  static tryAsync = tryCatchAsync;

  /**
   * Runs the passed value only if it is callable. If the value's not a function, returns the fallback value.
   * The execution is not wrapped in a try-catch block, so it will throw if the function errors.
   */
  static call = call;

  /**
   * Returns the first argument passed to it, unchanged. It is useful as a fallback function, for example when a transformer callback is optional.
   *
   * @example ```ts
   * function doSomething(value, transformer) {
   *   return (transformer || F.identity)(value);
   * }
   * ```
   */
  static identity = identity;
}

export { F };
export type { AsyncFn, Fn };
