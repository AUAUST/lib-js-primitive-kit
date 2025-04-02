import type { Arrayable } from "~/arrays/types";
import { toArray } from "./toArray";

export function difference<T, U>(arr: Arrayable<T>, exclude: Arrayable<U>): T[];
export function difference(arr: Arrayable, exclude: Arrayable): unknown[] {
  const set = new Set(toArray(exclude));

  return toArray(arr).filter((v) => !set.has(v));
}
