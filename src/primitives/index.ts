// This file is generated. Do not edit it directly.

import type { ToPrimitive } from "./methods/toPrimitive";

import { isNullish } from "./methods/isNullish";
import { isObject } from "./methods/isObject";
import { isPrimitive } from "./methods/isPrimitive";
import { isPropertyKey } from "./methods/isPropertyKey";
import { isSet } from "./methods/isSet";
import { toPrimitive } from "./methods/toPrimitive";

class PBase<const Input, Value = ToPrimitive<Input>> {
  readonly value: Value;

  constructor(value: Input) {
    this.value = toPrimitive(value) as ToPrimitive<Input> & Value;
  }

  valueOf(): Value {
    return this.value;
  }

  [Symbol.toPrimitive](): Value {
    return this.value;
  }
}

class P<const Input, Value = ToPrimitive<Input>> extends PBase<Input, Value> {}

const PWithMethods = Object.assign(P, {
  /**
   * Returns a boolean whether the given input is nullish.
   * Returns `true` for `null`, `undefined` and `NaN`.
   * Returns `false` for any other value.
   */
  isNullish,
  /**
   * Simple is-object check. Returns `true` for any object, including arrays and functions.
   *
   * If you need to check whether a value is a plain object, excluding functions and optionally arrays, use `O.is(value)` instead.
   */
  isObject,
  /**
   * Simple is-primitive check. Returns `true` for any primitive value.
   *
   * Returns `true` for strings, numbers, and booleans.
   * `Infinity` and `NaN` both return `true`.
   * Returns `false` for any other value, including `null`, `undefined` and functions.
   */
  isPrimitive,
  /** @alias P.isPrimitive */
  is: isPrimitive,
  /**
   * Returns a boolean whether the given input is a property key.
   * It aligns with TypeScript's `PropertyKey` type.
   * Returns `true` for strings, numbers, and symbols.
   * Returns `false` for any other value.
   */
  isPropertyKey,
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
  isSet,
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
  toPrimitive,
  /** @alias P.toPrimitive */
  from: toPrimitive,
});

const WrappedP = new Proxy(PWithMethods as typeof PWithMethods & typeof toPrimitive, {
  apply(_target, _thisArgument, argumentsList) {
    return toPrimitive(...argumentsList);
  },
});

export { WrappedP as P };

export type { ToPrimitive } from "./methods/toPrimitive";
