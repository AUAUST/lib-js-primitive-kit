import type { IfAny, IfNever, IfUnknown, IsEqual } from "type-fest";

/** A value that can be converted to an array. */
export type Arrayable<T = any> =
  | Iterable<T>
  | ArrayLike<T>
  | number
  | null
  | undefined;

/** Converts iterable values to arrays. */
export type ToArray<T> = T extends string
  ? string[]
  : T extends number | null | undefined
  ? unknown[]
  : T extends ArrayLike<infer U>
  ? U[]
  : T extends Iterable<infer U>
  ? U[]
  : never;

/** Returns an array type with the same values as the original but without order. */
export type TupleToArray<T extends Arrayable> = T extends Arrayable<infer U>
  ? IfAny<U, unknown[], U[]>
  : never;

/** Returns a union of the array values, or `unknown` if no values can be inferred. */
export type ArrayValue<T> = T extends Arrayable<infer U>
  ? IfNever<U, unknown, U>
  : never;

/** If the input is "uncertain", as in either `undefined`, `never`, or `unknown`, it will return the first type. Otherwise the second type. */
export type IfUncertain<T, TypeIfUncertain, TypeIfCertain> = IfNever<
  T,
  TypeIfUncertain,
  IfUnknown<
    T,
    TypeIfUncertain,
    IsEqual<T, undefined> extends true ? TypeIfUncertain : TypeIfCertain
  >
>;
