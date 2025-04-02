import type { ArrayValue, Arrayable } from "~/arrays/types";
import { toArray } from "./toArray";

export function random<T extends Arrayable>(arr: T): ArrayValue<T> {
  const a = toArray(arr);

  return a[Math.floor(Math.random() * a.length)];
}
