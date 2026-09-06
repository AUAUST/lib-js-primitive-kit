import type { Arrayable } from "~/arrays/types";
import { defineMethod } from "~/compiler";
import { shuffle } from "./shuffle";
import { toCopiedArray } from "./toCopiedArray";

export default defineMethod({
  instanceCallable: true,
});

/**
 * Returns a copy of the array shuffled.
 */
export function toShuffled<T>(arr: Arrayable<T>): T[];
export function toShuffled(arr: Arrayable): unknown[] {
  return shuffle(toCopiedArray(arr));
}
