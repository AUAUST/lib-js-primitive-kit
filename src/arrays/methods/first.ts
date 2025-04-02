import type { ArrayValue, Arrayable } from "~/arrays/types";
import { firstKey } from "./firstKey";
import { toArray } from "./toArray";

export function first<T extends Arrayable>(arr: T): ArrayValue<T> {
  const a = toArray(arr),
    k = firstKey(a);

  return k === undefined ? undefined! : a[k];
}
