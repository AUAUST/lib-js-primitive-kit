import type { Arrayable } from "~/arrays/types";
import { toArray } from "./toArray";

export function hasDuplicates(arr: Arrayable): boolean {
  const a = toArray(arr);

  return new Set(a).size !== a.length;
}
