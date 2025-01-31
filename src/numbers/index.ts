import {
  abs,
  average,
  ceil,
  clamp,
  floor,
  formatNumberToString,
  hasDecimal,
  isBetween,
  isEven,
  isInteger,
  isLooseNumber,
  isMultipleOf,
  isNegative,
  isNumber,
  isOdd,
  isPositive,
  isStrictNumber,
  max,
  min,
  numberToString,
  randFloat,
  randInt,
  round,
  subtract,
  sum,
  toExponential,
  toFixed,
  toLocaleString,
  toNumber,
  toPrecision,
} from "~/numbers/methods";

/** The N class, for Number, provides useful methods for working with numbers. */
class N extends Number {
  /**
   * Converts any value to a number.
   * `null` and `undefined` are converted to `0`.
   * Booleans are converted to `1` for `true` and `0` for `false`.
   * Strings are converted using `parseFloat()`.
   * All other values are converted using `Number()`.
   */
  static from = toNumber;

  /** Simple is-number check. Shortcut for `typeof x === "number"`, but also returns `false` for `NaN`. */
  static is = isNumber;

  /**
   * Returns a boolean whether the given input is a real number.
   * Only true for primitive numbers that are not `NaN` and are finite.
   */
  static isStrict = isStrictNumber;

  /**
   * Returns a boolean whether the given input is a "loose number".
   *
   * Returns true for any number, including `NaN` and `Infinity`.
   * Returns true for strings that are directly convertible to numbers with `parseFloat()`.
   * Returns true for objects which `valueOf()` method returns one of the above.
   * Returns false for any other value.
   */
  static isLoose = isLooseNumber;

  /** Returns a string containing a number represented in exponential notation. */
  static toExponential = toExponential;

  /** Returns a string representing a number in fixed-point notation. */
  static toFixed = toFixed;

  /** Returns a string with a language sensitive representation of this number. */
  static toLocaleString = toLocaleString;

  /** Returns a string containing a number represented either in exponential or fixed-point notation with a specified number of digits. */
  static toPrecision = toPrecision;

  /** Returns a string representation of a number. */
  static toString = numberToString;

  /**
   * Returns a formatted string representing the number.
   * Allows to configure the thousands and decimal separators, and the number of decimal digits.
   */
  static toFormattedString = formatNumberToString;

  /** Returns the minimum value from the provided numbers. */
  static min = min;

  /** Returns the maximum value from the provided numbers. */
  static max = max;

  /** Returns the sum of all the provided numbers. */
  static sum = sum;

  /** Returns the first number subtracted by the following numbers. */
  static subtract = subtract;

  /** Returns the average of all the provided numbers. Done by summing all the numbers and dividing by the count. */
  static average = average;

  /**
   * Returns a random integer between the provided numbers.
   * By default, `min` will be `0` and `max` will be `100`.
   */
  static randInt = randInt;

  /**
   * Returns a random float between the provided numbers.
   * By default, `min` will be `0` and `max` will be `1`.
   */
  static randFloat = randFloat;

  /** Returns a boolean whether the given integer is even. */
  static isEven = isEven;

  /** Returns a boolean whether the given integer is odd. */
  static isOdd = isOdd;

  /** Returns a boolean whether the given integer is a multiple of another integer. */
  static isMultipleOf = isMultipleOf;

  /** Returns the absolute value of a number . For example, the absolute value of -5 is the same as the absolute value of 5. */
  static abs = abs;

  /** Clamps a number between a minimum and a maximum. */
  static clamp = clamp;

  /** Floors a number. */
  static floor = floor;

  /** Ceils a number. */
  static ceil = ceil;

  /**
   * Rounds a number to the nearest integer or to the specified precision.
   * The precision represents the "increment" to round to.
   * For exemple, a precision of `0.5` will round to the nearest half-integer while `5` will round to the nearest multiple of 5.
   */
  static round = round;

  /** Checks whether a number is between a minimum and a maximum, inclusively. */
  static isBetween = isBetween;

  /** Checks whether a number is an integer. */
  static isInteger = isInteger;

  /** Checks whether has a decimal part. */
  static hasDecimal = hasDecimal;

  /** Checks whether a number is positive. */
  static isPositive = isPositive;

  /** Checks whether a number is negative. */
  static isNegative = isNegative;
}

const WrappedN = new Proxy(
  N as typeof N & {
    (input: any): number;
  },
  {
    apply(target, _, argumentsList) {
      // @ts-ignore
      return target.from(...argumentsList);
    },
  }
);

export type { Numberifiable } from "~/numbers/types";
export { WrappedN as N };
