import {
  abs,
  average,
  ceil,
  clamp,
  divide,
  floor,
  formatNumber,
  hasDecimal,
  isBetween,
  isEven,
  isInteger,
  isLooseNumber,
  isMultipleOf,
  isNegative,
  isNotNumber,
  isNumber,
  isOdd,
  isPositive,
  isStrictNumber,
  max,
  min,
  minMax,
  multiply,
  numberToString,
  or,
  power,
  randomFloat,
  randomInteger,
  remainder,
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
  static from = toNumber;

  static is = isNumber;

  static isNot = isNotNumber;

  static isStrict = isStrictNumber;

  static isLoose = isLooseNumber;

  static toExponential = toExponential;

  static toFixed = toFixed;

  static toLocaleString = toLocaleString;

  static toPrecision = toPrecision;

  static toString = numberToString;

  static format = formatNumber;

  /** @deprecated Use `N.format()` instead. */
  static toFormattedString = formatNumber;

  static min = min;

  static max = max;

  static minMax = minMax;

  static sum = sum;

  /** @see N.sum */
  static add = sum;

  static subtract = subtract;

  /** @see N.subtract  */
  static sub = subtract;

  static multiply = multiply;

  /** @see N.multiply */
  static mul = multiply;

  static divide = divide;

  /** @see N.divide */
  static div = divide;

  static remainder = remainder;

  /** @see N.remainder */
  static mod = remainder;

  static power = power;

  /** @see N.power */
  static pow = power;

  static average = average;

  static randomInteger = randomInteger;

  /** @see N.randomInteger */
  static randInt = randomInteger;

  static randomFloat = randomFloat;

  /** @see N.randomFloat */
  static randFloat = randomFloat;

  static isEven = isEven;

  static isOdd = isOdd;

  static isMultipleOf = isMultipleOf;

  static abs = abs;

  static clamp = clamp;

  static floor = floor;

  static ceil = ceil;

  static round = round;

  static isBetween = isBetween;

  static isInteger = isInteger;

  static hasDecimal = hasDecimal;

  static isPositive = isPositive;

  static isNegative = isNegative;

  static or = or;
}

const WrappedN = new Proxy(N as typeof N & typeof toNumber, {
  apply(target, _, argumentsList) {
    return target.from(...argumentsList);
  },
});

export type { ToNumber } from "~/numbers/methods";
export type { Numberifiable } from "~/numbers/types";
export { WrappedN as N };
