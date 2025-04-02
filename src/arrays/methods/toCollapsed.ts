import type { Arrayable } from "~/arrays/types";
import { type ToArray, toArray } from "./toArray";

export function toCollapsed<T extends Arrayable>(arr: T): ToArray<T> {
  return <ToArray<T>>toArray(arr).flat(0);
}
