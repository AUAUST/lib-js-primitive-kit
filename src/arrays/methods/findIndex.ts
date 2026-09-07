import type { Arrayable, ArrayValue } from "~/arrays/types";
import { defineMethod } from "~/compiler";
import type { Fn } from "~/functions";
import { isFunction } from "~/functions/methods";
import { hasKey } from "~/objects/methods";
import { toArray, type ToArray } from "./toArray";

export default defineMethod({
  instanceCallable: true,
});

export function findIndex<const T extends Arrayable>(
  array: T,
  predicate: (
    value: ArrayValue<T>,
    index: number,
    array: ToArray<T>,
  ) => unknown,
  thisArg?: any,
): number;
export function findIndex<T extends Arrayable>(
  array: T,
  predicate: keyof ArrayValue<T>,
  thisArg?: any,
): number;
export function findIndex(
  array: Arrayable,
  predicate: Fn | PropertyKey,
  thisArg?: any,
) {
  if (isFunction(predicate)) {
    return toArray(array).findIndex(predicate, thisArg);
  }

  return toArray(array).findIndex(
    (value) => hasKey(value, predicate) && value[predicate],
  );
}
