import type { ArrayValue, Arrayable } from "~/arrays/types";
import { defineMethod } from "~/compiler";
import { isFunction } from "~/functions/methods/isFunction";
import { toArray } from "./toArray";

export default defineMethod({
  instanceCallable: true,
});

export function isSorted<const T extends Arrayable>(
  array: T,
  compareFn?: (a: ArrayValue<T>, b: ArrayValue<T>) => number,
): boolean {
  const arr = toArray(array);

  if (arr.length <= 1) {
    return true;
  }

  if (isFunction(compareFn)) {
    for (let i = 1; i < arr.length; i++) {
      if (compareFn(arr[i - 1], arr[i]) > 0) {
        return false;
      }
    }

    return true;
  }

  for (let i = 1; i < arr.length; i++) {
    if (arr[i - 1] > arr[i]) {
      return false;
    }
  }

  return true;
}
