import type { ArrayValue, Arrayable, ToArray } from "~/arrays/types";
import { toCopiedArray } from "./toCopiedArray";

export function toSorted<T extends Arrayable>(
  arr: T,
  compareFn?: (a: ArrayValue<T>, b: ArrayValue<T>) => number
): ToArray<T> {
  return <ToArray<T>>toCopiedArray(arr).sort(compareFn);
}
