import type { Arrayable, ArrayValue } from "~/arrays/types";
import { defineMethod } from "~/compiler";
import { toArray, type ToArray } from "./toArray";

export default defineMethod({
  instanceCallable: "chainable",
});

export function fill<T extends Arrayable>(
  array: T,
  value: ArrayValue<T>,
  start?: number,
  end?: number,
): ToArray<T>;
export function fill(
  array: Arrayable,
  value: unknown,
  start?: number,
  end?: number,
) {
  return toArray(array).fill(value, start, end);
}
