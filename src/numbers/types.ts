import type { Stringifiable } from "~/strings";

type ZeroNumberifiable = null | undefined | void | "" | 0;
type NumberifiablePrimitives = number | bigint | boolean;
type NumberifiableValue =
  | ZeroNumberifiable
  | NumberifiablePrimitives
  | Number
  | Stringifiable;

export type Numberifiable =
  | NumberifiableValue
  | { toString(): NumberifiableValue }
  | { [Symbol.toPrimitive](): NumberifiableValue };
