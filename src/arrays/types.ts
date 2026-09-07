import type { IfNever } from "~/shared/types";

/**
 * A value that can be converted to an array.
 */
export type Arrayable<T = any> =
  | Iterable<T>
  | ArrayLike<T>
  | number
  | null
  | undefined;

/**
 * Returns a union of the array values, or `unknown` if no values can be inferred.
 */
export type ArrayValue<T> =
  T extends Arrayable<infer U> ? IfNever<U, unknown, U> : never;

/**
 * The array produced by converting a value with `toArray()`.
 */
export type ToArray<
  T,
  PreserveTuple extends boolean = true,
> = T extends readonly unknown[]
  ? PreserveTuple extends true
    ? [...T]
    : T[number][]
  : T extends string
    ? string[]
    : T extends number | null | undefined
      ? unknown[]
      : T extends ArrayLike<infer U>
        ? U[]
        : T extends Iterable<infer U>
          ? U[]
          : unknown[];

/**
 * A callback receiving an array value and its position in the converted array.
 */
export type Callback<T extends Arrayable, Result> = (
  value: ArrayValue<T>,
  index: number,
  array: ToArray<T>,
) => Result;

/**
 * A callback that narrows the values of an array-like input.
 */
export type TypeGuard<T extends Arrayable, Narrowed extends ArrayValue<T>> = (
  value: ArrayValue<T>,
  index: number,
  array: ToArray<T>,
) => value is Narrowed;

/**
 * The property names available on every non-nullish member of a type.
 */
export type PropertyNames<T> = T extends null | undefined ? never : keyof T;

/**
 * The value at a property, including `undefined` for nullish or missing union
 * members.
 */
export type PropertyValue<T, Key extends PropertyKey> = T extends
  | null
  | undefined
  ? undefined
  : Key extends keyof T
    ? T[Key]
    : undefined;
