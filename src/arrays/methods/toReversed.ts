import type { Arrayable, TupleToArray } from "~/arrays/types";
import { toCopiedArray } from "./toCopiedArray";

export function toReversed<T extends Arrayable>(arr: T): TupleToArray<T> {
  return <any>toCopiedArray(arr).reverse();
}
