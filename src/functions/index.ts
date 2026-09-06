// This file is generated. Do not edit it directly.

import type { ToFunction } from "./methods/toFunction";

import { call } from "./methods/call";
import { constant } from "./methods/constant";
import { identity } from "./methods/identity";
import { isAsyncFunction } from "./methods/isAsyncFunction";
import { isAsyncGeneratorFunction } from "./methods/isAsyncGeneratorFunction";
import { isBindable } from "./methods/isBindable";
import { isBound } from "./methods/isBound";
import { isConstructible } from "./methods/isConstructible";
import { isFunction } from "./methods/isFunction";
import { isGeneratorFunction } from "./methods/isGeneratorFunction";
import { isNotFunction } from "./methods/isNotFunction";
import { noop } from "./methods/noop";
import { once } from "./methods/once";
import { or } from "./methods/or";
import { toFunction } from "./methods/toFunction";
import { tryCatch } from "./methods/tryCatch";
import { tryCatchAsync } from "./methods/tryCatchAsync";

class FBase<const Input, Value extends Function = ToFunction<Input>> {
  readonly value: Value;

  constructor(value: Input) {
    this.value = toFunction(value) as ToFunction<Input> & Value;
  }

  valueOf(): Value {
    return this.value;
  }
}

class F<const Input, Value extends Function = ToFunction<Input>> extends FBase<Input, Value> {}

const FWithMethods = Object.assign(F, {
  /**
   * Runs the passed value only if it is callable. If the value's not a function, returns the fallback value.
   * The execution is not wrapped in a try-catch block, so it will throw if the function errors.
   */
  call,
  constant,
  /**
   * Returns the first argument passed to it, unchanged. It is useful as a fallback function, for example when a transformer callback is optional.
   *
   * @example ```ts
   * function doSomething(value, transformer) {
   *   return (transformer || F.identity)(value);
   * }
   * ```
   */
  identity,
  /**
   * Returns a boolean whether the function is async.
   * If the value is not a function, it returns false.
   */
  isAsyncFunction,
  /**
   * Returns a boolean whether the function is an async generator.
   * If the value is not a function, it returns false.
   */
  isAsyncGeneratorFunction,
  /**
   * Whether the function is bound or not. A function that is bound may no
   * longer be called with a different `this` context than the one it was bound to.
   *
   * **IMPORTANT** This does not work for async functions, as they never have a prototype.
   * They will always return `false` regardless of whether they are bound or not.
   *
   * @important This does not work for async functions, as they never have a prototype.
   * @see https://stackoverflow.com/a/35687230
   */
  isBindable,
  /**
   * Whether the function is bound or not. A function that is bound may no
   * longer be called with a different `this` context than the one it was bound to.
   *
   * **IMPORTANT** This does not work for async functions, as they never have a prototype.
   * They will always return `true` regardless of whether they are bound or not.
   *
   * @important This does not work for async functions, as they never have a prototype.
   * @see https://stackoverflow.com/a/35687230
   */
  isBound,
  /**
   * Checks if the value is constructible. This means `new value()` will work.
   */
  isConstructible,
  /**
   * Is-function check. Shortcut for `typeof x === "function"`.
   */
  isFunction,
  /** @alias F.isFunction */
  is: isFunction,
  /**
   * Returns a boolean whether the function is a generator.
   * If the value is not a function, it returns false.
   */
  isGeneratorFunction,
  /**
   * Is-not-function check. Returns `true` for any value that is not a function.
   */
  isNotFunction,
  /**
   * A void function that does nothing. Useful as a fallback function.
   */
  noop,
  /**
   * Calls the function once, caches the result, and returns the cached result on subsequent calls.
   */
  once,
  /**
   * Returns the first argument that is a function, or noop if none is found.
   */
  or,
  /**
   * If the value is a function, returns it.
   * If the value is not a function, returns a function that returns the value.
   */
  toFunction,
  /** @alias F.toFunction */
  from: toFunction,
  /**
   * Runs a function in a try-catch block, passing down the arguments and returning either the return value or the fallback value.
   */
  tryCatch,
  /**
   * Runs and awaits an async function in a try-catch block, passing down the arguments and returning either the return value or the fallback value.
   */
  tryCatchAsync,
});

const WrappedF = new Proxy(FWithMethods as typeof FWithMethods & typeof toFunction, {
  apply(_target, _thisArgument, argumentsList) {
    return toFunction(...argumentsList);
  },
});

export { WrappedF as F };

export type { OnceFn } from "./methods/once";
export type { ToFunction } from "./methods/toFunction";
export type { AsyncFn, Constructor, Fn } from "./types";
