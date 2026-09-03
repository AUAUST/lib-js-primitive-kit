import {
  call,
  identity,
  isAsyncFunction,
  isAsyncGeneratorFunction,
  isBindable,
  isBound,
  isConstructible,
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
import type { AsyncFn, Constructor, Fn } from "~/functions/types";

/** The F class, for Function, provides useful methods for working with functions. */
class F extends Function {
  static from = toFunction;

  static is = isFunction;

  static isNot = isNotFunction;

  static isAsync = isAsyncFunction;

  static isGenerator = isGeneratorFunction;

  static isAsyncGenerator = isAsyncGeneratorFunction;

  static try = tryCatch;

  static tryAsync = tryCatchAsync;

  static call = call;

  static identity = identity;

  static noop = noop;

  static or = or;

  static once = once;

  static isBound = isBound;

  static isBindable = isBindable;

  static isConstructible = isConstructible;
}

const WrappedF = new Proxy(F as typeof F & typeof toFunction, {
  apply(target, _, argumentsList) {
    return target.from(...argumentsList);
  },
});

export { WrappedF as F };
export type { AsyncFn, Constructor, Fn };
