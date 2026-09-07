import type { Arrayable, ArrayValue } from "~/arrays/types";
import { defineMethod } from "~/compiler";
import type { Fn } from "~/functions/types";
import { isPropertyKey } from "~/primitives/methods";
import type { UnionToIntersection } from "~/utils/types";
import { toArray, type ToArray } from "./toArray";

export default defineMethod({
  instanceCallable: "chainable",
});

export type MethodNames<T> = T extends unknown
  ? keyof {
      [K in keyof T as Extract<T[K], Fn> extends never ? never : K]: true;
    }
  : never;

export type Methods<T, K extends PropertyKey> = T extends unknown
  ? K extends keyof T
    ? Extract<T[K], Fn>
    : (...args: any[]) => undefined // Injects undefined into the union for missing methods
  : never;

export type MethodArguments<T, K extends MethodNames<T>> =
  UnionToIntersection<Parameters<Methods<T, K>>> extends infer Arguments extends
    unknown[]
    ? Arguments
    : never;

export function map<const T extends Arrayable, U>(
  array: T,
  callbackfn: (value: ArrayValue<T>, index: number, array: ToArray<T>) => U,
): U[];
export function map<T extends Arrayable, K extends MethodNames<ArrayValue<T>>>(
  array: T,
  method: K,
  ...args: MethodArguments<ArrayValue<T>, K>
): ReturnType<Methods<ArrayValue<T>, K>>[];
export function map(
  array: Arrayable,
  callbackfn: Fn | PropertyKey,
  ...args: unknown[]
) {
  if (isPropertyKey(callbackfn)) {
    return toArray(array).map((value) => value?.[callbackfn]?.(...args));
  }

  return toArray(array).map(callbackfn);
}
