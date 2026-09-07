import type { Stringifiable } from "~/strings/types";

type ZeroNumberifiable = null | undefined | void | "" | 0;

type NumberifiablePrimitives = number | bigint | boolean;

type NumberifiableValue =
  | ZeroNumberifiable
  | NumberifiablePrimitives
  | Number
  | Stringifiable;

export type Numberifiable<T extends NumberifiableValue = NumberifiableValue> =
  | T
  | { toString(): T }
  | { [Symbol.toPrimitive](): T };

/**
 * The number produced by converting a value with `toNumber()`.
 */
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
