import type { Arrayable, ArrayValue } from "~/arrays/types";
import { defineMethod } from "~/compiler";
import { toArray } from "./toArray";

export default defineMethod({
  instanceCallable: "chainable",
});

export function concat<const T extends Arrayable, const U>(
  array: T,
  ...items: ConcatArray<U>[]
): (ArrayValue<T> | U)[];
export function concat<const T extends Arrayable, const U>(
  array: T,
  ...items: (U | ConcatArray<U>)[]
): (ArrayValue<T> | U)[];
export function concat(
  array: Arrayable,
  ...arrays: ConcatArray<unknown>[]
): unknown[] {
  return toArray(array).concat(...arrays);
}
