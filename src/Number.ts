import type { TStringifiable } from "~/String";

type TNumberifiable =
  | number
  | Number
  | string
  | TStringifiable
  | null
  | undefined;
type TLooseNumberInput =
  | TNumberifiable
  | { toString(): TNumberifiable }
  | { [Symbol.toPrimitive](): TNumberifiable };

type TToNumber<T> = T extends number
  ? T
  : T extends null | undefined
  ? 0
  : T extends Number | string | TStringifiable
  ? number
  : T extends { toString(): infer U }
  ? TToNumber<U>
  : T extends { [Symbol.toPrimitive](): infer U }
  ? TToNumber<U>
  : typeof NaN;

/**
 * The N class, for Number, provides useful methods for working with numbers.
 */
class RawN extends Number {
  /**
   * Converts any value to a number.
   * `null` and `undefined` are converted to `0`.
   * Booleans are converted to `1` for `true` and `0` for `false`.
   * Strings are converted using `parseFloat()`.
   * All other values are converted using `Number()`.
   */
  static from(num: any): number {
    if (typeof num === "number") {
      return num;
    }

    if (num === null || num === undefined) {
      return 0;
    }

    if (typeof num === "string") {
      if (num.trim() === "") {
        return 0;
      }

      // Return NaN if the string contains no numeric characters.
      if (!/\d/.test(num)) {
        return NaN;
      }

      // Trim the beginning of the string until it starts with a number or a minus sign.
      // This is to prevent `parseFloat()` from returning `NaN` for strings like "foo123".
      num = num.replace(/^[^\d-]+/, "");

      return Number.parseFloat(num as string) || 0;
    }

    return Number(num);
  }

  /**
   * Simple is-number check.
   *
   * Returns `false` for `null` and `undefined`.
   * Returns `true` for `Number` objects.
   * Returns `true` for strings directly convertible to numbers (using `parseFloat()`).
   * Returns `false` for `NaN`.
   * Returns `true` for `Infinity` and `-Infinity`.
   * Returns `true` for `0` and `-0`.
   * Returns `true` for all other numbers.
   */
  static is(num: any): num is number {
    return (
      // Eliminates most non-numbers.
      !isNaN(num) &&
      // Limits the valid types to numbers and strings (excluding `null` and other edge cases that pass `isNaN()`).
      (typeof num?.valueOf() === "number" || typeof num?.valueOf() === "string")
    );
  }

  /**
   * Returns a boolean whether the given input is a number.
   * Returns `true` strictly for primitive numbers that are not `NaN` and finite.
   */
  static isStrict(num: any): num is number {
    return typeof num === "number" && !isNaN(num) && isFinite(num);
  }

  /**
   * Returns a string containing a number represented in exponential notation.
   */
  static toExponential(
    num: TLooseNumberInput,
    fractionDigits?: TLooseNumberInput
  ): string {
    return RawN.from(num).toExponential(RawN.from(fractionDigits));
  }

  /**
   * Returns a string representing a number in fixed-point notation.
   */
  static toFixed(
    num: TLooseNumberInput,
    fractionDigits?: TLooseNumberInput
  ): string {
    return RawN.from(num).toFixed(RawN.from(fractionDigits));
  }

  /**
   * Returns a string with a language sensitive representation of this number.
   */
  static toLocaleString(
    num: TLooseNumberInput,
    ...args: Parameters<Number["toLocaleString"]>
  ): string {
    return RawN.from(num).toLocaleString(...args);
  }

  /**
   * Returns a string containing a number represented either in exponential or fixed-point notation with a specified number of digits.
   */
  static toPrecision(
    num: TLooseNumberInput,
    precision?: TLooseNumberInput
  ): string {
    return RawN.from(num).toPrecision(RawN.from(precision));
  }

  /**
   * Returns a string representation of a number.
   */
  static toString(num: TLooseNumberInput, radix?: TLooseNumberInput): string {
    return RawN.from(num).toString(RawN.from(radix));
  }

  /**
   * Returns a formatted string representing the number.
   * Allows to configure the thousands and decimal separators, and the number of decimal digits.
   */
  static toFormattedString(
    num: TLooseNumberInput,
    options?: {
      thousandsSeparator?: string;
      decimalSeparator?: string;
      fractionDigits?: number;
    }
  ): string {
    const saneNum = RawN.from(num);
    const saneOptions = {
      thousandsSeparator: ",",
      decimalSeparator: ".",
      fractionDigits: undefined,
      ...options,
    };

    const parts =
      // Only use `toFixed()` if a maximum number of decimal digits is specified.
      typeof saneOptions.fractionDigits === "number"
        ? saneNum.toFixed(saneOptions.fractionDigits).split(".")
        : saneNum.toString().split(".");

    parts[0] = parts[0]!.replace(
      /\B(?=(\d{3})+(?!\d))/g,
      saneOptions.thousandsSeparator
    );
    return parts.join(saneOptions.decimalSeparator);
  }

  /**
   * Returns the minimum value from the provided numbers.
   */
  static min<Ns extends TLooseNumberInput[]>(
    ...nums: Ns
  ): TToNumber<Ns[number]> {
    return Math.min(...nums.map(RawN.from)) as TToNumber<Ns[number]>;
  }

  /**
   * Returns the maximum value from the provided numbers.
   */
  static max<Ns extends TLooseNumberInput[]>(
    ...nums: Ns
  ): TToNumber<Ns[number]> {
    return Math.max(...nums.map(RawN.from)) as TToNumber<Ns[number]>;
  }

  /**
   * Returns a random integer between the provided numbers.
   */
  static randInt(min: TLooseNumberInput, max: TLooseNumberInput): number {
    const saneMin = RawN.from(min);
    return Math.floor(Math.random() * (RawN.from(max) - saneMin + 1)) + saneMin;
  }

  /**
   * Returns a random float between the provided numbers.
   */
  static randFloat(min: TLooseNumberInput, max: TLooseNumberInput): number {
    const saneMin = RawN.from(min);
    return Math.random() * (RawN.from(max) - saneMin) + saneMin;
  }

  /**
   * Returns a boolean whether the given integer is even.
   */
  static isEven(num: TLooseNumberInput): num is number {
    return RawN.from(num) % 2 === 0;
  }

  /**
   * Returns a boolean whether the given integer is odd.
   */
  static isOdd(num: TLooseNumberInput): num is number {
    const mod = RawN.from(num) % 2;
    return mod === 1 || mod === -1;
  }

  /**
   * Returns a boolean whether the given integer is a multiple of another integer.
   */
  static isMultipleOf(
    num: TLooseNumberInput,
    multiple: TLooseNumberInput
  ): num is number {
    return RawN.from(num) % RawN.from(multiple) === 0;
  }

  /**
   * Clamps a number between a minimum and a maximum.
   */
  static clamp(
    num: TLooseNumberInput,
    min: TLooseNumberInput,
    max: TLooseNumberInput
  ): number {
    return Math.min(Math.max(RawN.from(num), RawN.from(min)), RawN.from(max));
  }

  /**
   * Floors a number.
   */
  static floor(num: TLooseNumberInput): number {
    return Math.floor(RawN.from(num));
  }

  /**
   * Ceils a number.
   */
  static ceil(num: TLooseNumberInput): number {
    return Math.ceil(RawN.from(num));
  }

  /**
   * Rounds a number to the nearest integer or to the specified precision.
   * The precision represents the "increment" to round to.
   * For exemple, a precision of `0.5` will round to the nearest half-integer while `5` will round to the nearest multiple of 5.
   */
  static round(num: TLooseNumberInput, precision?: TLooseNumberInput): number {
    if (RawN.is(precision)) {
      const sanePrecision = RawN.from(precision) || 1;
      return Math.round(RawN.from(num) / sanePrecision) * sanePrecision;
    }

    return Math.round(RawN.from(num));
  }

  /**
   * Checks whether a number is between a minimum and a maximum.
   */
  static isBetween(
    num: TLooseNumberInput,
    min: TLooseNumberInput,
    max: TLooseNumberInput
  ): boolean {
    return RawN.from(num) >= RawN.from(min) && RawN.from(num) <= RawN.from(max);
  }

  /**
   * Checks whether a number is an integer.
   */
  static isInteger(num: TLooseNumberInput): num is number {
    return Number.isInteger(RawN.from(num));
  }

  /**
   * Checks whether a number is positive.
   */
  static isPositive(num: TLooseNumberInput): boolean {
    return RawN.from(num) > 0;
  }

  /**
   * Checks whether a number is negative.
   */
  static isNegative(num: TLooseNumberInput): boolean {
    return RawN.from(num) < 0;
  }
}

const N = new Proxy(
  RawN as typeof RawN & {
    (input: any): number;
  },
  {
    apply(target, _, argumentsList) {
      // @ts-ignore
      return target.from(...argumentsList);
    },
  }
);

export { N };
export type { TNumberifiable };
