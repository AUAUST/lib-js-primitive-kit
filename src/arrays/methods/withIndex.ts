import type { Arrayable, ArrayValue } from "~/arrays/types";
import { defineMethod } from "~/compiler";
import { toArray, type ToArray } from "./toArray";

export default defineMethod({
  methodAliases: ["with"],
  instanceCallable: true,
});

export function withIndex<const T extends Arrayable>(
  array: T,
  index: number,
  value: ArrayValue<T>,
): ToArray<T, false>;
export function withIndex<const T extends Arrayable, const V>(
  array: T,
  index: number,
  value: V,
): (ArrayValue<T> | V)[];
export function withIndex(array: unknown[], index: number, value: unknown) {
  return toArray(array).with(index, value);
}
