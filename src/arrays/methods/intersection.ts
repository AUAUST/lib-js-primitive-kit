import type { Arrayable, TupleToArray } from "~/arrays/types";
import { toArray } from "./toArray";

export function intersection<T extends Arrayable, U extends Arrayable>(
  arr: T,
  include: U
): TupleToArray<T> {
  const intersectionSet = new Set(toArray(include));

  return <any>toArray(arr).filter((include) => intersectionSet.has(include));
}
