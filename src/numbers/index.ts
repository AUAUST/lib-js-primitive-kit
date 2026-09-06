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
import { toExponential } from "./methods/toExponential";
import { toFixed } from "./methods/toFixed";
import { toLocaleString } from "./methods/toLocaleString";
import { toNumber } from "./methods/toNumber";
import { toPrecision } from "./methods/toPrecision";
import { toString } from "./methods/toString";

type FacadeMethodArguments<Method extends (...args: any[]) => any> =
  Parameters<Method> extends [unknown, ...infer Args] ? Args : never;

class NBase<
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

  [Symbol.toPrimitive](): Value {
    return this.value;
  }
}

class N<const Input extends Numberifiable, Value extends number = ToNumber<Input>> extends NBase<Input, Value> {
  /**
   * Returns the absolute value of a number . For example, the absolute value of -5 is the same as the absolute value of 5.
   */
  declare abs: (...args: FacadeMethodArguments<typeof abs>) => N<ReturnType<typeof abs>>;
  /**
   * Returns the average of all the provided numbers. Done by summing all the numbers and dividing by the count.
   */
  declare average: (...args: FacadeMethodArguments<typeof average>) => N<ReturnType<typeof average>>;
  /**
   * Ceils a number.
   */
  declare ceil: (...args: FacadeMethodArguments<typeof ceil>) => N<ReturnType<typeof ceil>>;
  /**
   * Clamps a number between a minimum and a maximum.
   */
  declare clamp: (...args: FacadeMethodArguments<typeof clamp>) => N<ReturnType<typeof clamp>>;
  /**
   * Returns the quotient of the first number divided by the following numbers.
   */
  declare divide: (...args: FacadeMethodArguments<typeof divide>) => N<ReturnType<typeof divide>>;
  /**
   * Floors a number.
   */
  declare floor: (...args: FacadeMethodArguments<typeof floor>) => N<ReturnType<typeof floor>>;
  /**
   * Returns a formatted string representing the number.
   * Allows to configure the thousands and decimal separators, and the number of decimal digits.
   */
  declare formatNumber: (...args: FacadeMethodArguments<typeof formatNumber>) => ReturnType<typeof formatNumber>;
  /**
   * Checks whether has a decimal part.
   */
  declare hasDecimal: (...args: FacadeMethodArguments<typeof hasDecimal>) => ReturnType<typeof hasDecimal>;
  /**
   * Checks whether a number is between a minimum and a maximum, inclusively.
   */
  declare isBetween: (...args: FacadeMethodArguments<typeof isBetween>) => ReturnType<typeof isBetween>;
  /**
   * Returns a boolean whether the given integer is even.
   */
  declare isEven: (...args: FacadeMethodArguments<typeof isEven>) => ReturnType<typeof isEven>;
  /**
   * Returns a boolean whether the given input is a real number.
   * Only true for primitive numbers that are not `NaN` and are finite.
   */
  declare isFinite: (...args: FacadeMethodArguments<typeof isFinite>) => ReturnType<typeof isFinite>;
  /** @alias N.isFinite */
  declare isStrictNumber: (...args: FacadeMethodArguments<typeof isFinite>) => ReturnType<typeof isFinite>;
  /** @alias N.isFinite */
  declare isStrict: (...args: FacadeMethodArguments<typeof isFinite>) => ReturnType<typeof isFinite>;
  /**
   * Checks whether a number is an integer.
   */
  declare isInteger: (...args: FacadeMethodArguments<typeof isInteger>) => ReturnType<typeof isInteger>;
  /**
   * Returns a boolean whether the given integer is a multiple of another integer.
   */
  declare isMultipleOf: (...args: FacadeMethodArguments<typeof isMultipleOf>) => ReturnType<typeof isMultipleOf>;
  /**
   * Checks whether a number is negative.
   */
  declare isNegative: (...args: FacadeMethodArguments<typeof isNegative>) => ReturnType<typeof isNegative>;
  /**
   * Returns a boolean whether the given integer is odd.
   */
  declare isOdd: (...args: FacadeMethodArguments<typeof isOdd>) => ReturnType<typeof isOdd>;
  /**
   * Checks whether a number is positive.
   */
  declare isPositive: (...args: FacadeMethodArguments<typeof isPositive>) => ReturnType<typeof isPositive>;
  /**
   * Returns the maximum value from the provided numbers.
   */
  declare max: <Ns extends Numberifiable[]>(...args: FacadeMethodArguments<typeof max<Value, Ns>>) => N<ReturnType<typeof max<Value, Ns>>>;
  /**
   * Returns the minimum value from the provided numbers.
   */
  declare min: <Ns extends Numberifiable[]>(...args: FacadeMethodArguments<typeof min<Value, Ns>>) => N<ReturnType<typeof min<Value, Ns>>>;
  /**
   * Returns the product of all the provided numbers.
   */
  declare multiply: (...args: FacadeMethodArguments<typeof multiply>) => N<ReturnType<typeof multiply>>;
  /**
   * Returns the first non-`NaN` value from the provided numbers.
   */
  declare or: (...args: FacadeMethodArguments<typeof or>) => N<ReturnType<typeof or>>;
  /**
   * Returns the number raised to the power of the exponent.
   */
  declare power: (...args: FacadeMethodArguments<typeof power>) => N<ReturnType<typeof power>>;
  /**
   * Returns the remainder of the first number divided by the second number.*
   * `1` is used as the default divisor, allowing to extract the decimal part of a number.
   */
  declare remainder: (...args: FacadeMethodArguments<typeof remainder>) => N<ReturnType<typeof remainder>>;
  /**
   * Rounds a number to the nearest integer or to the specified precision.
   * The precision represents the "increment" to round to.
   * For exemple, a precision of `0.5` will round to the nearest half-integer while `5` will round to the nearest multiple of 5.
   */
  declare round: (...args: FacadeMethodArguments<typeof round>) => N<ReturnType<typeof round>>;
  /**
   * Returns the first number subtracted by the following numbers.
   */
  declare subtract: (...args: FacadeMethodArguments<typeof subtract>) => N<ReturnType<typeof subtract>>;
  /**
   * Returns the sum of all the provided numbers.
   */
  declare sum: (...args: FacadeMethodArguments<typeof sum>) => N<ReturnType<typeof sum>>;
  /**
   * Returns a string containing a number represented in exponential notation.
   */
  declare toExponential: (...args: FacadeMethodArguments<typeof toExponential>) => ReturnType<typeof toExponential>;
  /**
   * Returns a string representing a number in fixed-point notation.
   */
  declare toFixed: (...args: FacadeMethodArguments<typeof toFixed>) => ReturnType<typeof toFixed>;
  /**
   * Returns a string with a language sensitive representation of this number.
   */
  declare toLocaleString: (...args: FacadeMethodArguments<typeof toLocaleString>) => ReturnType<typeof toLocaleString>;
  /**
   * Returns a string containing a number represented either in exponential or fixed-point notation with a specified number of digits.
   */
  declare toPrecision: (...args: FacadeMethodArguments<typeof toPrecision>) => ReturnType<typeof toPrecision>;
  /**
   * Returns a string representation of a number.
   */
  declare toString: (...args: FacadeMethodArguments<typeof toString>) => ReturnType<typeof toString>;
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

function _wrap(method: any) {
  return function (this: { valueOf(): unknown }, ...args: any[]) {
    return method(this.valueOf(), ...args);
  };
}

function _wrapChainable(method: any) {
  return function (this: { valueOf(): unknown }, ...args: any[]) {
    return new N(method(this.valueOf(), ...args));
  };
}

let _wrapped: (...args: any[]) => any;

Object.assign(N.prototype, {
  abs: _wrapChainable(abs),
  average: _wrapChainable(average),
  ceil: _wrapChainable(ceil),
  clamp: _wrapChainable(clamp),
  divide: _wrapChainable(divide),
  floor: _wrapChainable(floor),
  formatNumber: _wrap(formatNumber),
  hasDecimal: _wrap(hasDecimal),
  isBetween: _wrap(isBetween),
  isEven: _wrap(isEven),
  isFinite: (_wrapped = _wrap(isFinite)),
  isStrictNumber: _wrapped,
  isStrict: _wrapped,
  isInteger: _wrap(isInteger),
  isMultipleOf: _wrap(isMultipleOf),
  isNegative: _wrap(isNegative),
  isOdd: _wrap(isOdd),
  isPositive: _wrap(isPositive),
  max: _wrapChainable(max),
  min: _wrapChainable(min),
  multiply: _wrapChainable(multiply),
  or: _wrapChainable(or),
  power: _wrapChainable(power),
  remainder: _wrapChainable(remainder),
  round: _wrapChainable(round),
  subtract: _wrapChainable(subtract),
  sum: _wrapChainable(sum),
  toExponential: _wrap(toExponential),
  toFixed: _wrap(toFixed),
  toLocaleString: _wrap(toLocaleString),
  toPrecision: _wrap(toPrecision),
  toString: _wrap(toString),
});

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
