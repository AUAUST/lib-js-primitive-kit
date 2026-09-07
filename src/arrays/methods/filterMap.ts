import type { Arrayable, ArrayValue } from "~/arrays/types";
import { defineMethod } from "~/compiler";
import { isFunction } from "~/functions/methods";
import type { Fn } from "~/functions/types";
import { toArray, type ToArray } from "./toArray";

export default defineMethod({
  instanceCallable: "chainable",
});

export type Callback<T extends Arrayable, Result> = (
  value: ArrayValue<T>,
  index: number,
  array: ToArray<T>,
) => Result;

export type PropertyNames<T> = T extends null | undefined ? never : keyof T;

export type PropertyValue<T, Key extends PropertyKey> = T extends
  | null
  | undefined
  ? undefined
  : Key extends keyof T
    ? T[Key]
    : undefined;

/**
 * Maps the values returned by a filter-mapper and excludes `undefined` results.
 * Alternatively, accepts a separate filter and mapper. Property keys can be
 * used in place of callbacks to read the corresponding value from each item.
 */
export function filterMap<const T extends Arrayable, Result>(
  array: T,
  callback: Callback<T, Result>,
): Exclude<Result, undefined>[];
export function filterMap<
  const T extends Arrayable,
  Key extends PropertyNames<ArrayValue<T>>,
>(
  array: T,
  property: Key,
): Exclude<PropertyValue<ArrayValue<T>, Key>, undefined>[];
export function filterMap<
  const T extends Arrayable,
  U extends ArrayValue<T>,
  Result,
>(
  array: T,
  filter: (
    value: ArrayValue<T>,
    index: number,
    array: ToArray<T>,
  ) => value is U,
  map: (value: U, index: number, array: ToArray<T>) => Result,
): Result[];
export function filterMap<
  const T extends Arrayable,
  U extends ArrayValue<T>,
  Key extends PropertyNames<U>,
>(
  array: T,
  filter: (
    value: ArrayValue<T>,
    index: number,
    array: ToArray<T>,
  ) => value is U,
  property: Key,
): PropertyValue<U, Key>[];
export function filterMap<const T extends Arrayable, Result>(
  array: T,
  filter: Callback<T, unknown>,
  map: Callback<T, Result>,
): Result[];
export function filterMap<
  const T extends Arrayable,
  Key extends PropertyNames<ArrayValue<T>>,
>(
  array: T,
  filter: Callback<T, unknown>,
  property: Key,
): PropertyValue<ArrayValue<T>, Key>[];
export function filterMap<
  const T extends Arrayable,
  FilterKey extends PropertyNames<ArrayValue<T>>,
  Result,
>(array: T, filterProperty: FilterKey, map: Callback<T, Result>): Result[];
export function filterMap<
  const T extends Arrayable,
  FilterKey extends PropertyNames<ArrayValue<T>>,
  MapKey extends PropertyNames<ArrayValue<T>>,
>(
  array: T,
  filterProperty: FilterKey,
  mapProperty: MapKey,
): PropertyValue<ArrayValue<T>, MapKey>[];
export function filterMap(
  this: any,
  array: Arrayable,
  filter: Fn | PropertyKey,
  map?: Fn | PropertyKey,
) {
  const arr = toArray(array);

  const result: unknown[] = [];

  const invoke = (callback: Fn | PropertyKey, value: any, index: number) =>
    isFunction(callback)
      ? callback.call(this, value, index, arr)
      : value?.[callback];

  arr.some(
    map === undefined
      ? (value, index) => {
          if ((value = invoke(filter, value, index)) !== undefined) {
            result.push(value);
          }
        }
      : (value, index) => {
          if (invoke(filter, value, index)) {
            result.push(invoke(map, value, index));
          }
        },
  );

  return result;
}
