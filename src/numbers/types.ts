import type { Stringifiable } from "~/strings";

export type _Numberifiable = number | Number | Stringifiable | null | undefined;

export type Numberifiable =
  | _Numberifiable
  | { toString(): _Numberifiable }
  | { [Symbol.toPrimitive](): _Numberifiable };

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
