import type { Arrayable } from "~/arrays/types";
import { first } from "./first";
import { random } from "./random";
import { toArray } from "./toArray";
import { toShuffled } from "./toShuffled";

export function randoms<T>(arr: Arrayable<T>, count?: number): T[];

export function randoms(arr: Arrayable, count = 1): unknown[] {
  const a = toArray(arr),
    l = a.length;

  if (l === 0) {
    // If the array is empty, we can't return anything
    return [];
  }

  if (l === 1) {
    // If the array has only one element, we return it
    return [first(a)];
  }

  if (count === 1) {
    // If we only want one element, random() is more efficient than copying the array and shuffling it
    return [random(arr)];
  }

  if (count >= a.length) {
    // If more elements are requested than the array has, we return a shuffled copy of the array
    return toShuffled(a);
  }

  return toShuffled(a).slice(0, count);
}
