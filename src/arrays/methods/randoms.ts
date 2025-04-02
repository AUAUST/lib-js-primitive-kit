import type { Arrayable, TupleToArray } from "~/arrays/types";
import { first } from "./first";
import { random } from "./random";
import { toArray } from "./toArray";
import { toShuffled } from "./toShuffled";

export function randoms<T extends Arrayable>(
  arr: T,
  count = 1
): TupleToArray<T> {
  const a = toArray(arr),
    l = a.length;

  if (l === 0) {
    // If the array is empty, we can't return anything
    return <any>[];
  }

  if (l === 1) {
    // If the array has only one element, we return it
    return <any>[first(a)];
  }

  if (count === 1) {
    // If we only want one element, random() is more efficient than copying the array and shuffling it
    return <any>[random(arr)];
  }

  if (count >= a.length) {
    // If more elements are requested than the array has, we return a shuffled copy of the array
    return <any>toShuffled(a);
  }

  return <any>toShuffled(a).slice(0, count);
}
