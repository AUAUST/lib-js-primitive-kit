import type { Arrayable, ArrayValue } from "~/arrays/types";
import { defineMethod } from "~/compiler";
import type { Fn } from "~/functions";
import { toArray, type ToArray } from "./toArray";

export default defineMethod({
  instanceCallable: true,
});

export function every<const T extends Arrayable, S extends ArrayValue<T>>(
  array: T,
  predicate: (
    value: ArrayValue<T>,
    index: number,
    array: ToArray<T>,
  ) => value is S,
  thisArg?: any,
): this is S[];
export function every<const T extends Arrayable>(
  array: T,
  predicate: (
    value: ArrayValue<T>,
    index: number,
    array: ToArray<T>,
  ) => unknown,
  thisArg?: any,
): boolean;
export function every<const T extends Arrayable>(
  array: T,
  predicate: keyof ArrayValue<T>,
  thisArg?: any,
): boolean;
export function every(
  array: Arrayable,
  predicate: Fn | PropertyKey,
  thisArg?: any,
) {
  if (typeof predicate === "function") {
    return toArray(array).every(predicate, thisArg);
  }

  return toArray(array).every((value) => !!value && value[predicate]);
}
