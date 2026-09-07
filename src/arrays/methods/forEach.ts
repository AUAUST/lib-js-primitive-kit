import type { Arrayable, ArrayValue } from "~/arrays/types";
import { defineMethod } from "~/compiler";
import type { Fn } from "~/functions";
import { toArray, type ToArray } from "./toArray";

export default defineMethod({
  instanceCallable: "chainable",
});

export function forEach<const T extends Arrayable>(
  array: T,
  callbackfn: (value: ArrayValue<T>, index: number, array: ToArray<T>) => void,
  thisArg?: any,
): ToArray<T>;
export function forEach(array: Arrayable, callbackfn: Fn, thisArg: any) {
  const arr = toArray(array);

  arr.forEach(callbackfn, thisArg);

  return arr;
}
