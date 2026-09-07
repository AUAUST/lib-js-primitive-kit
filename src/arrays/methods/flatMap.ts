import type { Arrayable, ArrayValue } from "~/arrays/types";
import { defineMethod } from "~/compiler";
import type { Fn } from "~/functions";
import type { ToArray } from "~/arrays/types";
import { toArray } from "./toArray";

export default defineMethod({
  instanceCallable: "chainable",
});

export function flatMap<const T extends Arrayable, const U, const This = undefined>(
  array: T,
  callback: (
    this: This,
    value: ArrayValue<T>,
    index: number,
    array: ToArray<T>,
  ) => U | ReadonlyArray<U>,
  thisArg?: This,
): U[];
export function flatMap(array: Arrayable, callback: Fn, thisArg: any) {
  return toArray(array).flatMap(callback, thisArg);
}
