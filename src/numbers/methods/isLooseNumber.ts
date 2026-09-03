import type { Numberifiable } from "~/numbers/types";

/**
 * Returns a boolean whether the given input is a "loose number".
 *
 * Returns true for any number, including `NaN` and `Infinity`.
 * Returns true for strings that are directly convertible to numbers with `parseFloat()`.
 * Returns true for objects which `valueOf()` method returns one of the above.
 * Returns false for any other value.
 */
export function isLooseNumber(num: unknown): num is Numberifiable {
  if (num === null || num === undefined) {
    return false;
  }

  num = num.valueOf();

  switch (typeof num) {
    case "number":
      return true;
    case "string":
      return !isNaN(+num) && !isNaN(Number.parseFloat(num));
    default:
      return false;
  }
}
