import type { ArrayValue, Arrayable } from "~/arrays/types";
import { defineMethod } from "~/compiler";
import { toArray } from "./toArray";

export default defineMethod({
  instanceCallable: true,
});

/**
 * Picks a random element from the array.
 */
export function random<T extends Arrayable>(arr: T): ArrayValue<T> {
  const a = toArray(arr);

  return a[Math.floor(Math.random() * a.length)];
}
