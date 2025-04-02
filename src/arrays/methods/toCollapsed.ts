import type { Arrayable, ToArray } from "~/arrays/types";
import { toArray } from "./toArray";

export function toCollapsed<T extends Arrayable>(arr: T): ToArray<T> {
  return <ToArray<T>>toArray(arr).flat(0);
}
