// This file is generated. Do not edit it directly.

import type { AsyncFn, Constructor, Fn, ToFunction } from "./types";

import { assignMethods } from "../shared/assignMethods";
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
import { mapArguments } from "./methods/mapArguments";
import { mapReturn } from "./methods/mapReturn";
import { noop } from "./methods/noop";
import { once } from "./methods/once";
import { or } from "./methods/or";
import { toFunction } from "./methods/toFunction";
import { tryCatch } from "./methods/tryCatch";
import { tryCatchAsync } from "./methods/tryCatchAsync";

type ArgumentsMapper<T extends Fn, Mapper> = Mapper extends (
  ...args: any[]
) => infer Result
  ? Result extends readonly [...Parameters<T>]
    ? Mapper
    : Parameters<T> extends [infer Parameter]
      ? Result extends readonly (infer Value)[]
        ? unknown extends Value
          ? never
          : Value extends Parameter
            ? Mapper
            : never
        : never
      : never
  : never;

type MappedArguments<Mapper> = Mapper extends (...args: infer Args) => any
  ? Args
  : never;

class F<
  const Input,
  const Value extends Fn = ToFunction<Input>,
> extends Function {
  declare readonly value: Value;

  constructor(value: Input) {
    super();

    const fn = toFunction(value) as ToFunction<Input> & Value;

    const callable = function (this: any, ...args: Parameters<Value>) {
      return fn.apply(this, args);
    };

    Object.setPrototypeOf(callable, new.target.prototype);

    Object.defineProperty(callable, "value", {
      configurable: false,
      enumerable: true,
      value: fn,
      writable: false,
    });

    return callable as unknown as this;
  }

  static make<const Input>(value: Input) {
    return new this(value);
  }

  valueOf(): Value {
    return this.value;
  }

  toFunction(): Value {
    return this.value;
  }
}

interface F<Input, Value extends Fn = ToFunction<Input>> {
  (this: ThisParameterType<Value>, ...args: Parameters<Value>): ReturnType<Value>;

  /**
   * Returns a boolean whether the function is async.
   * If the value is not a function, it returns false.
   */
  isAsyncFunction(): this is AsyncFn;

  /** @alias F.isAsyncFunction */
  isAsync(): this is AsyncFn;

  /**
   * Returns a boolean whether the function is an async generator.
   * If the value is not a function, it returns false.
   */
  isAsyncGeneratorFunction(): this is AsyncGeneratorFunction;

  /** @alias F.isAsyncGeneratorFunction */
  isAsyncGenerator(): this is AsyncGeneratorFunction;

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
  isBindable(): boolean;

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
  isBound(): boolean;

  /**
   * Checks if the value is constructible. This means `new value()` will work.
   */
  isConstructible(): this is Constructor;

  /**
   * Returns a boolean whether the function is a generator.
   * If the value is not a function, it returns false.
   */
  isGeneratorFunction(): this is GeneratorFunction;

  /** @alias F.isGeneratorFunction */
  isGenerator(): this is GeneratorFunction;

  /**
   * Creates a function that maps its arguments before passing them to another function.
   */
  mapArguments<const Mapper>(mapper: Mapper & ArgumentsMapper<Value, Mapper>): F<Fn<MappedArguments<Mapper>, ReturnType<Value>>>;

  /**
   * Creates a function that maps another function's return value.
   */
  mapReturn<const Result>(mapper: (value: ReturnType<Value>) => Result): F<Fn<Parameters<Value>, Result>>;
}

const staticMethods = {
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
   * Is-function check. Shortcut for `typeof x === "function"`.
   */
  isFunction,
  /** @alias F.isFunction */
  is: isFunction,
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
  /** @alias F.tryCatch */
  try: tryCatch,
  /**
   * Runs and awaits an async function in a try-catch block, passing down the arguments and returning either the return value or the fallback value.
   */
  tryCatchAsync,
  /** @alias F.tryCatchAsync */
  tryAsync: tryCatchAsync,
};

const instanceMethods = {
  /**
   * Returns a boolean whether the function is async.
   * If the value is not a function, it returns false.
   */
  isAsyncFunction,
  /** @alias F.isAsyncFunction */
  isAsync: isAsyncFunction,
  /**
   * Returns a boolean whether the function is an async generator.
   * If the value is not a function, it returns false.
   */
  isAsyncGeneratorFunction,
  /** @alias F.isAsyncGeneratorFunction */
  isAsyncGenerator: isAsyncGeneratorFunction,
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
   * Returns a boolean whether the function is a generator.
   * If the value is not a function, it returns false.
   */
  isGeneratorFunction,
  /** @alias F.isGeneratorFunction */
  isGenerator: isGeneratorFunction,
};

const chainableMethods = {
  /**
   * Creates a function that maps its arguments before passing them to another function.
   */
  mapArguments,
  /**
   * Creates a function that maps another function's return value.
   */
  mapReturn,
};

assignMethods(F, instanceMethods, false);
assignMethods(F, chainableMethods, true);

const FWithMethods = Object.assign(F, staticMethods, instanceMethods, chainableMethods);

export type FInstance<Input = unknown, Value extends Fn = ToFunction<Input>> = F<Input, Value>

function f<const Input>(value: Input): F<Input> {
  return new F(value);
}

const WrappedF = new Proxy(FWithMethods as typeof FWithMethods & typeof toFunction, {
  apply(_target, _thisArgument, argumentsList) {
    return toFunction(...argumentsList);
  },
});

export { WrappedF as F, f };

export type { OnceFn } from "./methods/once";
export type { AsyncFn, Constructor, Fn, ToFunction } from "./types";
