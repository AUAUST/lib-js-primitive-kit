// This file is generated. Do not edit it directly.

import type { ToNumber } from "./methods/toNumber";
import type { Numberifiable } from "./types";

import { assignMethods } from "../utils/assignMethods";
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
import { or } from "./methods/or";
import { power } from "./methods/power";
import { randomFloat } from "./methods/randomFloat";
import { randomInteger } from "./methods/randomInteger";
import { remainder } from "./methods/remainder";
import { round } from "./methods/round";
import { subtract } from "./methods/subtract";
import { sum } from "./methods/sum";
import { toBoolean } from "./methods/toBoolean";
import { toDegrees } from "./methods/toDegrees";
import { toExponential } from "./methods/toExponential";
import { toFixed } from "./methods/toFixed";
import { toLocaleString } from "./methods/toLocaleString";
import { toNumber } from "./methods/toNumber";
import { toPrecision } from "./methods/toPrecision";
import { toRadians } from "./methods/toRadians";
import { toString } from "./methods/toString";

class N<
  const Input extends Numberifiable,
  Value extends number = ToNumber<Input>,
> {
  readonly value: Value;

  constructor(value: Input) {
    this.value = toNumber(value) as ToNumber<Input> & Value;
  }

  static make<Input extends Numberifiable>(value: Input) {
    return new this(value);
  }

  valueOf(): Value {
    return this.value;
  }

  toNumber(): Value {
    return this.value;
  }

  [Symbol.toPrimitive](): Value {
    return this.value;
  }
}

interface N<Input extends Numberifiable, Value extends number = ToNumber<Input>> {
  /**
   * Returns the absolute value of a number . For example, the absolute value of -5 is the same as the absolute value of 5.
   */
  abs(): N<number>;

  /**
   * Returns the average of all the provided numbers. Done by summing all the numbers and dividing by the count.
   */
  average(): N<number>;

  /**
   * Ceils a number.
   */
  ceil(): N<number>;

  /**
   * Clamps a number between a minimum and a maximum.
   */
  clamp(min: Numberifiable, max: Numberifiable): N<number>;

  /**
   * Returns the quotient of the first number divided by the following numbers.
   */
  divide(...nums: Numberifiable[]): N<number>;

  /**
   * Floors a number.
   */
  floor(): N<number>;

  /**
   * Returns a formatted string representing the number.
   * Allows to configure the thousands and decimal separators, and the number of decimal digits.
   */
  formatNumber(options?: {
    thousandsSeparator?: string;
    decimalSeparator?: string;
    fractionDigits?: number;
  }): string;

  /**
   * Checks whether has a decimal part.
   */
  hasDecimal(): boolean;

  /**
   * Checks whether a number is between a minimum and a maximum, inclusively.
   */
  isBetween(min: Numberifiable, max: Numberifiable): boolean;

  /**
   * Returns a boolean whether the given integer is even.
   */
  isEven(): this is number;

  /**
   * Returns a boolean whether the given input is a real number.
   * Only true for primitive numbers that are not `NaN` and are finite.
   */
  isFinite(): this is number;

  /** @alias N.isFinite */
  isStrictNumber(): this is number;

  /** @alias N.isFinite */
  isStrict(): this is number;

  /**
   * Checks whether a number is an integer.
   */
  isInteger(): boolean;

  /**
   * Returns a boolean whether the given integer is a multiple of another integer.
   */
  isMultipleOf(multiple: Numberifiable): this is number;

  /**
   * Checks whether a number is negative.
   */
  isNegative(): boolean;

  /**
   * Returns a boolean whether the given integer is odd.
   */
  isOdd(): this is number;

  /**
   * Checks whether a number is positive.
   */
  isPositive(): boolean;

  /**
   * Returns the maximum value from the provided numbers.
   */
  max<Ns extends Numberifiable[]>(...nums: Ns): N<ToNumber<Ns[number]>>;

  /**
   * Returns the minimum value from the provided numbers.
   */
  min<Ns extends Numberifiable[]>(...nums: Ns): N<ToNumber<Ns[number]>>;

  /**
   * Returns the product of all the provided numbers.
   */
  multiply(): N<number>;

  /**
   * Returns the first non-`NaN` value from the provided numbers.
   */
  or(): N<number>;

  /**
   * Returns the number raised to the power of the exponent.
   */
  power(exponent: Numberifiable): N<number>;

  /**
   * Returns the remainder of the first number divided by the second number.*
   * `1` is used as the default divisor, allowing to extract the decimal part of a number.
   */
  remainder(divisor?: Numberifiable): N<number>;

  /**
   * Rounds a number to the nearest integer or to the specified precision.
   * The precision represents the "increment" to round to.
   * For exemple, a precision of `0.5` will round to the nearest half-integer while `5` will round to the nearest multiple of 5.
   */
  round(precision?: Numberifiable): N<number>;

  /**
   * Returns the first number subtracted by the following numbers.
   */
  subtract(...nums: Numberifiable[]): N<number>;

  /**
   * Returns the sum of all the provided numbers.
   */
  sum(): N<number>;

  toBoolean(): boolean;

  /**
   * Converts an angle from radians to degrees.
   */
  toDegrees(): N<number>;

  /**
   * Returns a string containing a number represented in exponential notation.
   */
  toExponential(fractionDigits?: Numberifiable): string;

  /**
   * Returns a string representing a number in fixed-point notation.
   */
  toFixed(fractionDigits?: Numberifiable): string;

  /**
   * Returns a string with a language sensitive representation of this number.
   */
  toLocaleString(...args: Parameters<Number["toLocaleString"]>): string;

  /**
   * Returns a string containing a number represented either in exponential or fixed-point notation with a specified number of digits.
   */
  toPrecision(precision?: Numberifiable): string;

  /**
   * Converts an angle from degrees to radians.
   */
  toRadians(): N<number>;

  /**
   * Returns a string representation of a number.
   */
  toString(radix?: Numberifiable): string;
}

const staticMethods = {
  /**
   * Returns a boolean whether the given input is a "loose number".
   *
   * Returns true for any number, including `NaN` and `Infinity`.
   * Returns true for strings that are directly convertible to numbers with `parseFloat()`.
   * Returns true for objects which `valueOf()` method returns one of the above.
   * Returns false for any other value.
   */
  isLooseNumber,
  /**
   * Is-not-number check. Returns `true` for any value that is not a number, including `NaN`.
   */
  isNotNumber,
  /**
   * Is-number check. Shortcut for `typeof x === "number"`, but also returns `false` for `NaN`.
   */
  isNumber,
  /** @alias N.isNumber */
  is: isNumber,
  /**
   * Returns a tuple of the minimum and maximum values from the provided numbers.
   */
  minMax,
  /**
   * Returns a random float between the provided numbers.
   * By default, `min` will be `0` and `max` will be `1`.
   */
  randomFloat,
  /** @alias N.randomFloat */
  randFloat: randomFloat,
  /**
   * Returns a random integer between the provided numbers.
   * By default, `min` will be `0` and `max` will be `100`.
   */
  randomInteger,
  /** @alias N.randomInteger */
  randInt: randomInteger,
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
};

const instanceMethods = {
  /**
   * Returns a formatted string representing the number.
   * Allows to configure the thousands and decimal separators, and the number of decimal digits.
   */
  formatNumber,
  /**
   * Checks whether has a decimal part.
   */
  hasDecimal,
  /**
   * Checks whether a number is between a minimum and a maximum, inclusively.
   */
  isBetween,
  /**
   * Returns a boolean whether the given integer is even.
   */
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
  /**
   * Checks whether a number is an integer.
   */
  isInteger,
  /**
   * Returns a boolean whether the given integer is a multiple of another integer.
   */
  isMultipleOf,
  /**
   * Checks whether a number is negative.
   */
  isNegative,
  /**
   * Returns a boolean whether the given integer is odd.
   */
  isOdd,
  /**
   * Checks whether a number is positive.
   */
  isPositive,
  toBoolean,
  /**
   * Returns a string containing a number represented in exponential notation.
   */
  toExponential,
  /**
   * Returns a string representing a number in fixed-point notation.
   */
  toFixed,
  /**
   * Returns a string with a language sensitive representation of this number.
   */
  toLocaleString,
  /**
   * Returns a string containing a number represented either in exponential or fixed-point notation with a specified number of digits.
   */
  toPrecision,
  /**
   * Returns a string representation of a number.
   */
  toString,
};

const chainableMethods = {
  /**
   * Returns the absolute value of a number . For example, the absolute value of -5 is the same as the absolute value of 5.
   */
  abs,
  /**
   * Returns the average of all the provided numbers. Done by summing all the numbers and dividing by the count.
   */
  average,
  /**
   * Ceils a number.
   */
  ceil,
  /**
   * Clamps a number between a minimum and a maximum.
   */
  clamp,
  /**
   * Returns the quotient of the first number divided by the following numbers.
   */
  divide,
  /**
   * Floors a number.
   */
  floor,
  /**
   * Returns the maximum value from the provided numbers.
   */
  max,
  /**
   * Returns the minimum value from the provided numbers.
   */
  min,
  /**
   * Returns the product of all the provided numbers.
   */
  multiply,
  /**
   * Returns the first non-`NaN` value from the provided numbers.
   */
  or,
  /**
   * Returns the number raised to the power of the exponent.
   */
  power,
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
  /**
   * Returns the first number subtracted by the following numbers.
   */
  subtract,
  /**
   * Returns the sum of all the provided numbers.
   */
  sum,
  /**
   * Converts an angle from radians to degrees.
   */
  toDegrees,
  /**
   * Converts an angle from degrees to radians.
   */
  toRadians,
};

assignMethods(N, instanceMethods, false);
assignMethods(N, chainableMethods, true);

const NWithMethods = Object.assign(N, staticMethods, instanceMethods, chainableMethods);

export type NInstance<Input extends Numberifiable = Numberifiable, Value extends number = ToNumber<Input>> = N<Input, Value>

function n<const Input extends Numberifiable>(value: Input): N<Input> {
  return new N(value);
}

const WrappedN = new Proxy(NWithMethods as typeof NWithMethods & typeof toNumber, {
  apply(_target, _thisArgument, argumentsList) {
    return toNumber(...argumentsList);
  },
});

export { WrappedN as N, n };

export type { ToNumber } from "./methods/toNumber";
export type { Numberifiable } from "./types";
