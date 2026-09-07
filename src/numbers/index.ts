// This file is generated. Do not edit it directly.

import type { ToNumber } from "./methods/toNumber";
import type { Numberifiable } from "./types";

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
import { toExponential } from "./methods/toExponential";
import { toFixed } from "./methods/toFixed";
import { toLocaleString } from "./methods/toLocaleString";
import { toNumber } from "./methods/toNumber";
import { toPrecision } from "./methods/toPrecision";
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

  /**
   * Returns the absolute value of a number . For example, the absolute value of -5 is the same as the absolute value of 5.
   */
  abs(): N<number>;
  abs(...args: any[]): any {
    // @ts-ignore
    return new N(abs(this.valueOf(), ...args));
  }

  /**
   * Returns the average of all the provided numbers. Done by summing all the numbers and dividing by the count.
   */
  average(): N<number>;
  average(...args: any[]): any {
    // @ts-ignore
    return new N(average(this.valueOf(), ...args));
  }

  /**
   * Ceils a number.
   */
  ceil(): N<number>;
  ceil(...args: any[]): any {
    // @ts-ignore
    return new N(ceil(this.valueOf(), ...args));
  }

  /**
   * Clamps a number between a minimum and a maximum.
   */
  clamp(min: Numberifiable, max: Numberifiable): N<number>;
  clamp(...args: any[]): any {
    // @ts-ignore
    return new N(clamp(this.valueOf(), ...args));
  }

  /**
   * Returns the quotient of the first number divided by the following numbers.
   */
  divide(...nums: Numberifiable[]): N<number>;
  divide(...args: any[]): any {
    // @ts-ignore
    return new N(divide(this.valueOf(), ...args));
  }

  /**
   * Floors a number.
   */
  floor(): N<number>;
  floor(...args: any[]): any {
    // @ts-ignore
    return new N(floor(this.valueOf(), ...args));
  }

  /**
   * Returns a formatted string representing the number.
   * Allows to configure the thousands and decimal separators, and the number of decimal digits.
   */
  formatNumber(options?: {
    thousandsSeparator?: string;
    decimalSeparator?: string;
    fractionDigits?: number;
  }): string;
  formatNumber(...args: any[]): any {
    // @ts-ignore
    return formatNumber(this.valueOf(), ...args);
  }

  /**
   * Checks whether has a decimal part.
   */
  hasDecimal(): boolean;
  hasDecimal(...args: any[]): any {
    // @ts-ignore
    return hasDecimal(this.valueOf(), ...args);
  }

  /**
   * Checks whether a number is between a minimum and a maximum, inclusively.
   */
  isBetween(min: Numberifiable, max: Numberifiable): boolean;
  isBetween(...args: any[]): any {
    // @ts-ignore
    return isBetween(this.valueOf(), ...args);
  }

  /**
   * Returns a boolean whether the given integer is even.
   */
  isEven(): this is number;
  isEven(...args: any[]): any {
    // @ts-ignore
    return isEven(this.valueOf(), ...args);
  }

  /**
   * Returns a boolean whether the given input is a real number.
   * Only true for primitive numbers that are not `NaN` and are finite.
   */
  isFinite(): this is number;
  isFinite(...args: any[]): any {
    // @ts-ignore
    return isFinite(this.valueOf(), ...args);
  }

  /** @alias N.isFinite */
  isStrictNumber = this.isFinite;

  /** @alias N.isFinite */
  isStrict = this.isFinite;

  /**
   * Checks whether a number is an integer.
   */
  isInteger(): boolean;
  isInteger(...args: any[]): any {
    // @ts-ignore
    return isInteger(this.valueOf(), ...args);
  }

  /**
   * Returns a boolean whether the given integer is a multiple of another integer.
   */
  isMultipleOf(multiple: Numberifiable): this is number;
  isMultipleOf(...args: any[]): any {
    // @ts-ignore
    return isMultipleOf(this.valueOf(), ...args);
  }

  /**
   * Checks whether a number is negative.
   */
  isNegative(): boolean;
  isNegative(...args: any[]): any {
    // @ts-ignore
    return isNegative(this.valueOf(), ...args);
  }

  /**
   * Returns a boolean whether the given integer is odd.
   */
  isOdd(): this is number;
  isOdd(...args: any[]): any {
    // @ts-ignore
    return isOdd(this.valueOf(), ...args);
  }

  /**
   * Checks whether a number is positive.
   */
  isPositive(): boolean;
  isPositive(...args: any[]): any {
    // @ts-ignore
    return isPositive(this.valueOf(), ...args);
  }

  /**
   * Returns the maximum value from the provided numbers.
   */
  max<Ns extends Numberifiable[]>(...nums: Ns): N<ToNumber<Ns[number]>>;
  max(...args: any[]): any {
    // @ts-ignore
    return new N(max(this.valueOf(), ...args));
  }

  /**
   * Returns the minimum value from the provided numbers.
   */
  min<Ns extends Numberifiable[]>(...nums: Ns): N<ToNumber<Ns[number]>>;
  min(...args: any[]): any {
    // @ts-ignore
    return new N(min(this.valueOf(), ...args));
  }

  /**
   * Returns the product of all the provided numbers.
   */
  multiply(): N<number>;
  multiply(...args: any[]): any {
    // @ts-ignore
    return new N(multiply(this.valueOf(), ...args));
  }

  /**
   * Returns the first non-`NaN` value from the provided numbers.
   */
  or(): N<number>;
  or(...args: any[]): any {
    // @ts-ignore
    return new N(or(this.valueOf(), ...args));
  }

  /**
   * Returns the number raised to the power of the exponent.
   */
  power(exponent: Numberifiable): N<number>;
  power(...args: any[]): any {
    // @ts-ignore
    return new N(power(this.valueOf(), ...args));
  }

  /**
   * Returns the remainder of the first number divided by the second number.*
   * `1` is used as the default divisor, allowing to extract the decimal part of a number.
   */
  remainder(divisor?: Numberifiable): N<number>;
  remainder(...args: any[]): any {
    // @ts-ignore
    return new N(remainder(this.valueOf(), ...args));
  }

  /**
   * Rounds a number to the nearest integer or to the specified precision.
   * The precision represents the "increment" to round to.
   * For exemple, a precision of `0.5` will round to the nearest half-integer while `5` will round to the nearest multiple of 5.
   */
  round(precision?: Numberifiable): N<number>;
  round(...args: any[]): any {
    // @ts-ignore
    return new N(round(this.valueOf(), ...args));
  }

  /**
   * Returns the first number subtracted by the following numbers.
   */
  subtract(...nums: Numberifiable[]): N<number>;
  subtract(...args: any[]): any {
    // @ts-ignore
    return new N(subtract(this.valueOf(), ...args));
  }

  /**
   * Returns the sum of all the provided numbers.
   */
  sum(): N<number>;
  sum(...args: any[]): any {
    // @ts-ignore
    return new N(sum(this.valueOf(), ...args));
  }

  toBoolean(): boolean;
  toBoolean(...args: any[]): any {
    // @ts-ignore
    return toBoolean(this.valueOf(), ...args);
  }

  /**
   * Returns a string containing a number represented in exponential notation.
   */
  toExponential(fractionDigits?: Numberifiable): string;
  toExponential(...args: any[]): any {
    // @ts-ignore
    return toExponential(this.valueOf(), ...args);
  }

  /**
   * Returns a string representing a number in fixed-point notation.
   */
  toFixed(fractionDigits?: Numberifiable): string;
  toFixed(...args: any[]): any {
    // @ts-ignore
    return toFixed(this.valueOf(), ...args);
  }

  /**
   * Returns a string with a language sensitive representation of this number.
   */
  toLocaleString(...args: Parameters<Number["toLocaleString"]>): string;
  toLocaleString(...args: any[]): any {
    // @ts-ignore
    return toLocaleString(this.valueOf(), ...args);
  }

  /**
   * Returns a string containing a number represented either in exponential or fixed-point notation with a specified number of digits.
   */
  toPrecision(precision?: Numberifiable): string;
  toPrecision(...args: any[]): any {
    // @ts-ignore
    return toPrecision(this.valueOf(), ...args);
  }

  /**
   * Returns a string representation of a number.
   */
  toString(radix?: Numberifiable): string;
  toString(...args: any[]): any {
    // @ts-ignore
    return toString(this.valueOf(), ...args);
  }
}

const NWithMethods = Object.assign(N, {
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
   * Returns a boolean whether the given input is a "loose number".
   *
   * Returns true for any number, including `NaN` and `Infinity`.
   * Returns true for strings that are directly convertible to numbers with `parseFloat()`.
   * Returns true for objects which `valueOf()` method returns one of the above.
   * Returns false for any other value.
   */
  isLooseNumber,
  /**
   * Returns a boolean whether the given integer is a multiple of another integer.
   */
  isMultipleOf,
  /**
   * Checks whether a number is negative.
   */
  isNegative,
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
   * Returns a boolean whether the given integer is odd.
   */
  isOdd,
  /**
   * Checks whether a number is positive.
   */
  isPositive,
  /**
   * Returns the maximum value from the provided numbers.
   */
  max,
  /**
   * Returns the minimum value from the provided numbers.
   */
  min,
  /**
   * Returns a tuple of the minimum and maximum values from the provided numbers.
   */
  minMax,
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
   * Converts any value to a number.
   * `null` and `undefined` are converted to `0`.
   * Booleans are converted to `1` for `true` and `0` for `false`.
   * Strings are converted using `parseFloat()`.
   * All other values are converted using `Number()`.
   */
  toNumber,
  /** @alias N.toNumber */
  from: toNumber,
  /**
   * Returns a string containing a number represented either in exponential or fixed-point notation with a specified number of digits.
   */
  toPrecision,
  /**
   * Returns a string representation of a number.
   */
  toString,
});

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
