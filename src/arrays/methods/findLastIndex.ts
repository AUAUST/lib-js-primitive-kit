import type { Arrayable, ArrayValue, Callback } from "~/arrays/types";
import { defineMethod } from "~/compiler";
import type { Fn } from "~/functions";
import { isFunction } from "~/functions/methods";
import { hasKey } from "~/objects/methods";
import { toArray } from "./toArray";

export default defineMethod({
  instanceCallable: true,
});

export function findLastIndex<const T extends Arrayable>(
  array: T,
  predicate: Callback<T, unknown>,
  thisArg?: any,
): number;
export function findLastIndex<const T extends Arrayable>(
  array: T,
  predicate: keyof ArrayValue<T>,
  thisArg?: any,
): number;
export function findLastIndex(
  array: Arrayable,
  predicate: Fn | PropertyKey,
  thisArg?: any,
) {
  if (isFunction(predicate)) {
    return toArray(array).findLastIndex(predicate, thisArg);
  }

  return toArray(array).findLastIndex(
    (value) => hasKey(value, predicate) && value[predicate],
  );
}
