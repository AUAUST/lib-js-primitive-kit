import type { Stringifiable } from "~/strings";

export type _Numberifiable = number | Number | Stringifiable | null | undefined;

export type Numberifiable =
  | _Numberifiable
  | { toString(): _Numberifiable }
  | { [Symbol.toPrimitive](): _Numberifiable };
