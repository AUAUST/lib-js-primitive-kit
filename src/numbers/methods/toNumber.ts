import { defineMethod } from "~/compiler";
import type { Stringifiable } from "~/strings";

export default defineMethod({
  staticAliases: ["from"],
});

export type ToNumber<T> = T extends number
  ? T
  : T extends null | undefined
    ? 0
    : T extends Number | string | Stringifiable
      ? number
      : T extends { toString(): infer U }
        ? ToNumber<U>
        : T extends { [Symbol.toPrimitive](): infer U }
          ? ToNumber<U>
          : typeof NaN;

/**
 * Converts any value to a number.
 * `null` and `undefined` are converted to `0`.
 * Booleans are converted to `1` for `true` and `0` for `false`.
 * Strings are converted using `parseFloat()`.
 * All other values are converted using `Number()`.
 */
export function toNumber(num?: unknown): number {
  if (num === null || num === undefined) {
    return 0;
  }

  num = num.valueOf();

  switch (typeof num) {
    case "number":
      return num;
    case "symbol":
      return NaN;
    case "string": {
      if (num.trim() === "") {
        return 0;
      }

      num = num.replaceAll("_", ""); // adds support to `1_000_000` syntax, which is not supported by `parseFloat()` but is valid when typed in code

      return (
        Number(num) || // will handle radix and scientific notation
        Number.parseFloat(String(num)) // will handle everything else
      );
    }
  }

  return Number(num);
}
