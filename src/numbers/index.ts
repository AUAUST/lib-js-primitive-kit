// This file is generated. Do not edit it directly.

import type { ToNumber } from "./methods/toNumber";

import { abs } from "./methods/abs";
import { average } from "./methods/average";
import { ceil } from "./methods/ceil";
import { clamp } from "./methods/clamp";
import { divide } from "./methods/divide";
import { floor } from "./methods/floor";
import { formatNumber } from "./methods/formatNumber";
import { hasDecimal } from "./methods/hasDecimal";
import { isBetween } from "./methods/isBetween";
import { isEven } from "./methods/isEven";
import { isFinite } from "./methods/isFinite";
import { isInteger } from "./methods/isInteger";
import { isLooseNumber } from "./methods/isLooseNumber";
import { isMultipleOf } from "./methods/isMultipleOf";
import { isNegative } from "./methods/isNegative";
import { isNotNumber } from "./methods/isNotNumber";
import { isNumber } from "./methods/isNumber";
import { isOdd } from "./methods/isOdd";
import { isPositive } from "./methods/isPositive";
import { max } from "./methods/max";
import { min } from "./methods/min";
import { minMax } from "./methods/minMax";
import { multiply } from "./methods/multiply";
import { numberToString } from "./methods/numberToString";
import { or } from "./methods/or";
import { power } from "./methods/power";
import { randomFloat } from "./methods/randomFloat";
import { randomInteger } from "./methods/randomInteger";
import { remainder } from "./methods/remainder";
import { round } from "./methods/round";
import { subtract } from "./methods/subtract";
import { sum } from "./methods/sum";
import { toExponential } from "./methods/toExponential";
import { toFixed } from "./methods/toFixed";
import { toLocaleString } from "./methods/toLocaleString";
import { toNumber } from "./methods/toNumber";
import { toPrecision } from "./methods/toPrecision";
import { Numberifiable } from "./types";

class NBase<
  const Input extends Numberifiable,
  Value extends number = ToNumber<Input>,
> {
  readonly value: Value;

  constructor(value: Input) {
    this.value = toNumber(value) as ToNumber<Input> & Value;
  }

  valueOf(): Value {
    return this.value;
  }

  [Symbol.toPrimitive](): Value {
    return this.value;
  }
}

class NFacade<const Input extends Numberifiable, Value extends number = ToNumber<Input>> extends NBase<Input, Value> {}

const N = Object.assign(NFacade, {
  /** Returns the absolute value of a number . For example, the absolute value of -5 is the same as the absolute value of 5. */
  abs,
  /** Returns the average of all the provided numbers. Done by summing all the numbers and dividing by the count. */
  average,
  /** Ceils a number. */
  ceil,
  /** Clamps a number between a minimum and a maximum. */
  clamp,
  /** Returns the quotient of the first number divided by the following numbers. */
  divide,
  /** Floors a number. */
  floor,
  /**
   * Returns a formatted string representing the number.
   * Allows to configure the thousands and decimal separators, and the number of decimal digits.
   */
  formatNumber,
  /** Checks whether has a decimal part. */
  hasDecimal,
  /** Checks whether a number is between a minimum and a maximum, inclusively. */
  isBetween,
  /** Returns a boolean whether the given integer is even. */
  isEven,
  /**
   * Returns a boolean whether the given input is a real number.
   * Only true for primitive numbers that are not `NaN` and are finite.
   */
  isFinite,
  /** @alias N.isFinite */
  isStrictNumber: isFinite,
  /** @alias N.isFinite */
  isStrict: isFinite,
  /** Checks whether a number is an integer. */
  isInteger,
  /**
   * Returns a boolean whether the given input is a "loose number".
   *
   * Returns true for any number, including `NaN` and `Infinity`.
   * Returns true for strings that are directly convertible to numbers with `parseFloat()`.
   * Returns true for objects which `valueOf()` method returns one of the above.
   * Returns false for any other value.
   */
  isLooseNumber,
  /** Returns a boolean whether the given integer is a multiple of another integer. */
  isMultipleOf,
  /** Checks whether a number is negative. */
  isNegative,
  /** Is-not-number check. Returns `true` for any value that is not a number, including `NaN`. */
  isNotNumber,
  /** Is-number check. Shortcut for `typeof x === "number"`, but also returns `false` for `NaN`. */
  isNumber,
  /** @alias N.isNumber */
  is: isNumber,
  /** Returns a boolean whether the given integer is odd. */
  isOdd,
  /** Checks whether a number is positive. */
  isPositive,
  /** Returns the maximum value from the provided numbers. */
  max,
  /** Returns the minimum value from the provided numbers. */
  min,
  /** Returns a tuple of the minimum and maximum values from the provided numbers. */
  minMax,
  /** Returns the product of all the provided numbers. */
  multiply,
  /** Returns a string representation of a number. */
  numberToString,
  /** Returns the first non-`NaN` value from the provided numbers. */
  or,
  /** Returns the number raised to the power of the exponent. */
  power,
  /**
   * Returns a random float between the provided numbers.
   * By default, `min` will be `0` and `max` will be `1`.
   */
  randomFloat,
  /**
   * Returns a random integer between the provided numbers.
   * By default, `min` will be `0` and `max` will be `100`.
   */
  randomInteger,
  /**
   * Returns the remainder of the first number divided by the second number.*
   * `1` is used as the default divisor, allowing to extract the decimal part of a number.
   */
  remainder,
  /**
   * Rounds a number to the nearest integer or to the specified precision.
   * The precision represents the "increment" to round to.
   * For exemple, a precision of `0.5` will round to the nearest half-integer while `5` will round to the nearest multiple of 5.
   */
  round,
  /** Returns the first number subtracted by the following numbers. */
  subtract,
  /** Returns the sum of all the provided numbers. */
  sum,
  /** Returns a string containing a number represented in exponential notation. */
  toExponential,
  /** Returns a string representing a number in fixed-point notation. */
  toFixed,
  /** Returns a string with a language sensitive representation of this number. */
  toLocaleString,
  /**
   * Converts any value to a number.
   * `null` and `undefined` are converted to `0`.
   * Booleans are converted to `1` for `true` and `0` for `false`.
   * Strings are converted using `parseFloat()`.
   * All other values are converted using `Number()`.
   */
  toNumber,
  /** @alias N.toNumber */
  from: toNumber,
  /** Returns a string containing a number represented either in exponential or fixed-point notation with a specified number of digits. */
  toPrecision,
});

const WrappedN = new Proxy(N as typeof N & typeof toNumber, {
  apply(_target, _thisArgument, argumentsList) {
    return toNumber(...argumentsList);
  },
});

export { WrappedN as N };

export type { ToNumber } from "./methods/toNumber";
export type { Numberifiable } from "./types";
