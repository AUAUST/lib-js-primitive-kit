import type { Arrayable, TupleToArray } from "~/arrays/types";
import { toArray } from "./toArray";

export function difference<T extends Arrayable, U extends Arrayable>(
  arr: T,
  exclude: U
): TupleToArray<T> {
  const exclusionSet = new Set(toArray(exclude));

  return <any>toArray(arr).filter((v) => !exclusionSet.has(v));
}
