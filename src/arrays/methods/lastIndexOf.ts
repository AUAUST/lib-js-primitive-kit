import type { Arrayable, ArrayValue } from "~/arrays/types";
import { defineMethod } from "~/compiler";
import { toArray } from "./toArray";

export default defineMethod({
  instanceCallable: true,
});

export function lastIndexOf<T extends Arrayable>(
  array: T,
  searchElement: ArrayValue<T>,
  fromIndex?: number,
): number {
  return toArray(array).lastIndexOf(searchElement, fromIndex);
}
