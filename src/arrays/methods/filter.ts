import type { Arrayable, ArrayValue } from "~/arrays/types";
import { defineMethod } from "~/compiler";
import type { Fn } from "~/functions";
import { isFunction } from "~/functions/methods";
import { hasKey } from "~/objects/methods";
import { toArray, type ToArray } from "./toArray";

export default defineMethod({
  instanceCallable: "chainable",
});

export function filter<const T extends Arrayable, S extends ArrayValue<T>>(
  array: T,
  predicate: (
    value: ArrayValue<T>,
    index: number,
    array: ToArray<T>,
  ) => value is S,
  thisArg?: any,
): S[];
export function filter<const T extends Arrayable>(
  array: T,
  predicate: (
    value: ArrayValue<T>,
    index: number,
    array: ToArray<T>,
  ) => unknown,
  thisArg?: any,
): T[];
export function filter<T extends Arrayable>(
  array: T,
  predicate: keyof ArrayValue<T>,
  thisArg?: any,
): ToArray<T>;
export function filter(
  array: Arrayable,
  predicate: Fn | PropertyKey,
  thisArg?: any,
) {
  if (isFunction(predicate)) {
    return toArray(array).filter(predicate, thisArg);
  }

  return toArray(array).filter(
    (value) => hasKey(value, predicate) && value[predicate],
  );
}
