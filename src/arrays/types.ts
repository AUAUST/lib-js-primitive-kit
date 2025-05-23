import type { IfNever, IfUnknown, IsEqual } from "type-fest";

/** A value that can be converted to an array. */
export type Arrayable<T = any> =
  | Iterable<T>
  | ArrayLike<T>
  | number
  | null
  | undefined;

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
