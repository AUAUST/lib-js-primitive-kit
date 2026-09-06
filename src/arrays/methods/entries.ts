import type { Arrayable, ArrayValue } from "~/arrays/types";
import { defineMethod } from "~/compiler";
import { toArray } from "./toArray";

export default defineMethod({
  instanceCallable: "chainable",
});

export function entries<const T extends Arrayable>(
  array: T,
): ArrayIterator<[number, ArrayValue<T>]> {
  return toArray(array).entries();
}
