import type { Arrayable, TupleToArray } from "~/arrays/types";
import { shuffle } from "./shuffle";
import { toCopiedArray } from "./toCopiedArray";

export function toShuffled<T extends Arrayable>(arr: T): TupleToArray<T> {
  return <any>shuffle(toCopiedArray(arr));
}
