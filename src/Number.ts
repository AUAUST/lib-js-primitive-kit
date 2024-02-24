import type { Numberifiable, ToNumber, _Numberifiable } from "~/types/Number";

/**
 * The N class, for Number, provides useful methods for working with numbers.
 */
class N extends Number {
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
      // Remove all spaces and underscores.
      // Spaces because it's common to use spaces as thousands separators.
      // Underscores because it's a common programming convention to use them as thousands separators.
      num = num.replace(/[\s_]/g, "");

      if (num === "") {
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
    num: Numberifiable,
    fractionDigits?: Numberifiable
  ): string {
    return N.from(num).toExponential(N.from(fractionDigits));
  }

  /**
   * Returns a string representing a number in fixed-point notation.
   */
  static toFixed(num: Numberifiable, fractionDigits?: Numberifiable): string {
    return N.from(num).toFixed(N.from(fractionDigits));
  }

  /**
   * Returns a string with a language sensitive representation of this number.
   */
  static toLocaleString(
    num: Numberifiable,
    ...args: Parameters<Number["toLocaleString"]>
  ): string {
    return N.from(num).toLocaleString(...args);
  }

  /**
   * Returns a string containing a number represented either in exponential or fixed-point notation with a specified number of digits.
   */
  static toPrecision(num: Numberifiable, precision?: Numberifiable): string {
    return N.from(num).toPrecision(N.from(precision));
  }

  /**
   * Returns a string representation of a number.
   */
  static toString(num: Numberifiable, radix?: Numberifiable): string {
    return N.from(num).toString(N.from(radix));
  }

  /**
   * Returns a formatted string representing the number.
   * Allows to configure the thousands and decimal separators, and the number of decimal digits.
   */
  static toFormattedString(
    num: Numberifiable,
    options?: {
      thousandsSeparator?: string;
      decimalSeparator?: string;
      fractionDigits?: number;
    }
  ): string {
    const saneNum = N.from(num);
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
  static min<Ns extends Numberifiable[]>(...nums: Ns): ToNumber<Ns[number]> {
    return Math.min(...nums.map(N.from)) as ToNumber<Ns[number]>;
  }

  /**
   * Returns the maximum value from the provided numbers.
   */
  static max<Ns extends Numberifiable[]>(...nums: Ns): ToNumber<Ns[number]> {
    return Math.max(...nums.map(N.from)) as ToNumber<Ns[number]>;
  }

  /**
   * Returns the sum of all the provided numbers.
   */
  static sum(...nums: Numberifiable[]): number {
    return nums.reduce<number>((acc, num) => acc + N.from(num), 0);
  }

  /**
   * Returns the first number subtracted by the following numbers.
   */
  static subtract(num: Numberifiable, ...nums: Numberifiable[]): number {
    return nums.reduce<number>((acc, n) => acc - N.from(n), N.from(num));
  }

  /**
   * Returns the average of all the provided numbers. Done by summing all the numbers and dividing by the count.
   */
  static average(...nums: Numberifiable[]): number {
    return N.sum(...nums) / nums.length;
  }

  /**
   * Returns a random integer between the provided numbers.
   */
  static randInt(min: Numberifiable, max: Numberifiable): number {
    const saneMin = N.from(min);
    return Math.floor(Math.random() * (N.from(max) - saneMin + 1)) + saneMin;
  }

  /**
   * Returns a random float between the provided numbers.
   */
  static randFloat(min: Numberifiable, max: Numberifiable): number {
    const saneMin = N.from(min);
    return Math.random() * (N.from(max) - saneMin) + saneMin;
  }

  /**
   * Returns a boolean whether the given integer is even.
   */
  static isEven(num: Numberifiable): num is number {
    return N.from(num) % 2 === 0;
  }

  /**
   * Returns a boolean whether the given integer is odd.
   */
  static isOdd(num: Numberifiable): num is number {
    const mod = N.from(num) % 2;
    return mod === 1 || mod === -1;
  }

  /**
   * Returns a boolean whether the given integer is a multiple of another integer.
   */
  static isMultipleOf(
    num: Numberifiable,
    multiple: Numberifiable
  ): num is number {
    return N.from(num) % N.from(multiple) === 0;
  }

  /**
   * Clamps a number between a minimum and a maximum.
   */
  static clamp(
    num: Numberifiable,
    min: Numberifiable,
    max: Numberifiable
  ): number {
    return Math.min(Math.max(N.from(num), N.from(min)), N.from(max));
  }

  /**
   * Floors a number.
   */
  static floor(num: Numberifiable): number {
    return Math.floor(N.from(num));
  }

  /**
   * Ceils a number.
   */
  static ceil(num: Numberifiable): number {
    return Math.ceil(N.from(num));
  }

  /**
   * Rounds a number to the nearest integer or to the specified precision.
   * The precision represents the "increment" to round to.
   * For exemple, a precision of `0.5` will round to the nearest half-integer while `5` will round to the nearest multiple of 5.
   */
  static round(num: Numberifiable, precision?: Numberifiable): number {
    if (N.is(precision)) {
      const sanePrecision = N.from(precision) || 1;
      return Math.round(N.from(num) / sanePrecision) * sanePrecision;
    }

    return Math.round(N.from(num));
  }

  /**
   * Checks whether a number is between a minimum and a maximum.
   */
  static isBetween(
    num: Numberifiable,
    min: Numberifiable,
    max: Numberifiable
  ): boolean {
    return N.from(num) >= N.from(min) && N.from(num) <= N.from(max);
  }

  /**
   * Checks whether a number is an integer.
   */
  static isInteger(num: Numberifiable): num is number {
    return Number.isInteger(N.from(num));
  }

  /**
   * Checks whether a number is positive.
   */
  static isPositive(num: Numberifiable): boolean {
    return N.from(num) > 0;
  }

  /**
   * Checks whether a number is negative.
   */
  static isNegative(num: Numberifiable): boolean {
    return N.from(num) < 0;
  }
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

export { WrappedN as N };
export type { _Numberifiable as Numberifiable };
