import type { Arrayable } from "~/arrays/types";
import { toArray } from "./toArray";

export function flat<T extends Arrayable, D extends number = 1>(
  arr: T,
  depth?: D
): FlatArray<T, D>[] {
  return toArray(arr).flat(depth === -1 ? Infinity : depth ?? 1);
}
