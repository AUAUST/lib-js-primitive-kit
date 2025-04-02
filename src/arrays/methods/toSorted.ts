import type { ArrayValue, Arrayable } from "~/arrays/types";
import type { ToArray } from "./toArray";
import { toCopiedArray } from "./toCopiedArray";

export function toSorted<T extends Arrayable>(
  arr: T,
  compareFn?: (a: ArrayValue<T>, b: ArrayValue<T>) => number
): ToArray<T> {
  return <ToArray<T>>toCopiedArray(arr).sort(compareFn);
}
