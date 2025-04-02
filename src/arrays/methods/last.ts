import type { ArrayValue, Arrayable } from "~/arrays/types";
import { lastKey } from "./lastKey";
import { toArray } from "./toArray";

export function last<T extends Arrayable>(arr: T): ArrayValue<T> {
  const a = toArray(arr),
    k = lastKey(a);

  return k === undefined ? undefined! : a[k];
}
