import type { Arrayable } from "~/arrays/types";
import { toArray } from "./toArray";

export function intersection<T>(arr: Arrayable<T>, include: Arrayable<T>): T[];
export function intersection(arr: Arrayable, include: Arrayable): unknown[] {
  const set = new Set(toArray(include));

  return toArray(arr).filter((item) => set.has(item));
}
