import type { Arrayable, ArrayValue } from "~/arrays/types";
import { defineMethod } from "~/compiler";
import { toArray } from "./toArray";

export default defineMethod({
  instanceCallable: true,
});

export function at<const T extends Arrayable>(
  array: T,
  index: number,
): ArrayValue<T> {
  return toArray(array).at(index);
}
