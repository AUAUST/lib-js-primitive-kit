import type { ArrayValue, Arrayable } from "~/arrays/types";
import { toArray } from "./toArray";

export function pluck<T extends Arrayable, K extends keyof ArrayValue<T>>(
  arr: T,
  key: K
): ArrayValue<T>[K][] {
  return toArray(arr).map((v) => v[key]);
}
