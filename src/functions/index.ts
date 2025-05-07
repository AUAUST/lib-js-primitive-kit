import {
  call,
  identity,
  isAsyncFunction,
  isAsyncGeneratorFunction,
  isBindable,
  isBound,
  isFunction,
  isGeneratorFunction,
  isNotFunction,
  noop,
  once,
  or,
  toFunction,
  tryCatch,
  tryCatchAsync,
} from "~/functions/methods";
import type { AsyncFn, Fn } from "~/functions/types";

/** The F class, for Function, provides useful methods for working with functions. */
class F extends Function {
  /**
   * If the value is a function, returns it.
   * If the value is not a function, returns a function that returns the value.
   */
  static from = toFunction;

  /** Is-function check. Shortcut for `typeof x === "function"`. */
  static is = isFunction;

  /** Is-not-function check. Returns `true` for any value that is not a function. */
  static isNot = isNotFunction;

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

  /** A void function that does nothing. Useful as a fallback function. */
  static noop = noop;

  /** Returns the first argument that is a function, or noop if none is found. */
  static or = or;

  /** Calls the function once, caches the result, and returns the cached result on subsequent calls. */
  static once = once;

  /**
   * Whether the function is bound or not. A function that is bound may no
   * longer be called with a different `this` context than the one it was bound to.
   *
   * **IMPORTANT** This does not work for async functions, as they never have a prototype.
   * They will always return `true` regardless of whether they are bound or not.
   *
   * @see https://stackoverflow.com/a/35687230
   */
  static isBound = isBound;

  /**
   * Whether the function is bound or not. A function that is bound may no
   * longer be called with a different `this` context than the one it was bound to.
   *
   * **IMPORTANT** This does not work for async functions, as they never have a prototype.
   * They will always return `false` regardless of whether they are bound or not.
   *
   * @see https://stackoverflow.com/a/35687230
   */
  static isBindable = isBindable;
}

const WrappedF = new Proxy(F as typeof F & typeof toFunction, {
  apply(target, _, argumentsList) {
    return target.from(...argumentsList);
  },
});

export { WrappedF as F };
export type { AsyncFn, Fn };
