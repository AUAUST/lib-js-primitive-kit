import type { Arrayable, ArrayValue } from "~/arrays/types";
import { defineMethod } from "~/compiler";
import type { Fn } from "~/functions";
import { isFunction } from "~/functions/methods";
import { hasKey } from "~/objects/methods";
import { toArray, type ToArray } from "./toArray";

export default defineMethod({
  instanceCallable: true,
});

export function findLast<const T extends Arrayable, S extends ArrayValue<T>>(
  array: T,
  predicate: (
    value: ArrayValue<T>,
    index: number,
    array: ToArray<T>,
  ) => value is S,
  thisArg?: any,
): S | undefined;
export function findLast<const T extends Arrayable>(
  array: T,
  predicate: (
    value: ArrayValue<T>,
    index: number,
    array: ToArray<T>,
  ) => unknown,
  thisArg?: any,
): ArrayValue<T> | undefined;
export function findLast<T extends Arrayable>(
  array: T,
  predicate: keyof ArrayValue<T>,
  thisArg?: any,
): ArrayValue<T> | undefined;
export function findLast(
  array: Arrayable,
  predicate: Fn | PropertyKey,
  thisArg?: any,
) {
  if (isFunction(predicate)) {
    return toArray(array).findLast(predicate, thisArg);
  }

  return toArray(array).findLast(
    (value) => hasKey(value, predicate) && value[predicate],
  );
}
