import type { Arrayable, ArrayValue } from "~/arrays/types";
import { defineMethod } from "~/compiler";
import { toArray } from "./toArray";

export default defineMethod({
  instanceCallable: true,
});

export function indexOf<const T extends Arrayable>(
  array: T,
  searchElement: ArrayValue<T>,
  fromIndex?: number,
): number {
  return toArray(array).indexOf(searchElement, fromIndex);
}
