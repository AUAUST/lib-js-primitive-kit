import type { Arrayable, ToArray } from "~/arrays/types";
import { toArray } from "./toArray";

export function toDeduplicated<T extends Arrayable>(arr: T): ToArray<T> {
  return <ToArray<T>>Array.from(new Set(toArray(arr)));
}
