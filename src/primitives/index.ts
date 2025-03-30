import {
  isNullish,
  isObject,
  isPrimitive,
  isPropertyKey,
  isSet,
  toPrimitive,
} from "~/primitives/methods";
import type { ToPrimitive } from "~/primitives/types";

/**
 * The P class, for Primitives, provides useful methods for working with primitives globally.
 */
class P {
  /**
   * Converts any value to a primitive.
   * Primitives are returned as-is.
   * Primitive objects are converted to their primitive values.
   * `null` and `undefined` are converted to `null`.
   * Other values are converted using `[Symbol.toPrimitive]`, `valueOf()`, and `toString()`.
   * If none of these methods return a primitive, `undefined` is returned.
   * For exemple, a function will return `undefined` as it has no primitive value.
   * An array will return `undefined`, as making a generic conversion to primitive that works for all arrays is not possible.
   */
  static from = toPrimitive;

  /**
   * Simple is-primitive check. Returns `true` for any primitive value.
   *
   * Returns `true` for strings, numbers, and booleans.
   * `Infinity` and `NaN` both return `true`.
   * Returns `false` for any other value, including `null`, `undefined` and functions.
   */
  static isPrimitive = isPrimitive;

  /**
   * Simple is-object check. Returns `true` for any object, including arrays and functions.
   *
   * If you need to check whether a value is a plain object, excluding functions and optionally arrays, use `O.is(value)` instead.
   */
  static isObject = isObject;

  /**
   * Returns a boolean whether the given input is nullish.
   * Returns `true` for `null`, `undefined` and `NaN`.
   * Returns `false` for any other value.
   */
  static isNullish = isNullish;

  /**
   * Returns a boolean whether the given input is set.
   *
   * As a helper, it also checks against the string "undefined".
   * It allows for use as `P.isSet(typeof x)`, which is more concise than `typeof x !== "undefined"` when checking whether a variable is defined.
   *
   * ```ts
   * const isBrowser = P.isSet(typeof window);
   * ```
   */
  static isSet = isSet;

  /**
   * Returns a boolean whether the given input is a property key.
   * It aligns with TypeScript's `PropertyKey` type.
   * Returns `true` for strings, numbers, and symbols.
   * Returns `false` for any other value.
   */
  static isPropertyKey = isPropertyKey;
}

const WrappedP = new Proxy(
  P as typeof P & {
    <T, P extends "string" | "number" | "boolean" | "default">(
      input: T,
      prefer?: P
    ): ToPrimitive<T>;
  },
  {
    apply(target, _, argumentsList) {
      // @ts-ignore
      return target.from(...argumentsList);
    },
  }
);

export { WrappedP as P };
