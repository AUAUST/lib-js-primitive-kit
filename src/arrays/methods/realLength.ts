import type { Arrayable } from "~/arrays/types";
import { toArray } from "./toArray";

export function realLength<T extends Arrayable>(arr: T): number {
  return Object.keys(toArray(arr)).length;
}
