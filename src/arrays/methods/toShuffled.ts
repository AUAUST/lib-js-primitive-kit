import type { Arrayable } from "~/arrays/types";
import { shuffle } from "./shuffle";
import { toCopiedArray } from "./toCopiedArray";

export function toShuffled<T>(arr: Arrayable<T>): T[];
export function toShuffled(arr: Arrayable): unknown[] {
  return shuffle(toCopiedArray(arr));
}
