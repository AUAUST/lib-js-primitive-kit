import type { Arrayable, Callback, ToArray } from "~/arrays/types";
import { defineMethod } from "~/compiler";
import type { Fn } from "~/functions";
import { toArray } from "./toArray";

export default defineMethod({
  instanceCallable: "chainable",
});

export function forEach<const T extends Arrayable>(
  array: T,
  callbackfn: Callback<T, void>,
  thisArg?: any,
): ToArray<T>;
export function forEach(array: Arrayable, callbackfn: Fn, thisArg: any) {
  const arr = toArray(array);

  arr.forEach(callbackfn, thisArg);

  return arr;
}
