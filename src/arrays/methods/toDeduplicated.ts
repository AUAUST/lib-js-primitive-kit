import type { Arrayable } from "~/arrays/types";
import { type ToArray, toArray } from "./toArray";

export function toDeduplicated<T extends Arrayable>(arr: T): ToArray<T> {
  return <ToArray<T>>Array.from(new Set(toArray(arr)));
}
