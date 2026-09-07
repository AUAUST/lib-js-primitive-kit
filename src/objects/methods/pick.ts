import { defineMethod } from "~/compiler";
import { isFunction } from "~/functions/methods";
import type { GenericRecord } from "~/shared/types";

export default defineMethod({
  instanceCallable: "chainable",
});

export type Picked<
  T extends object,
  K extends keyof T,
  C extends ((key: K, value: T[K]) => any) | undefined = undefined,
> = {
  -readonly [P in K]: C extends (key: P, value: T[P]) => infer R ? R : T[P];
};

/**
 * Picks a subset of properties from an object. Missing properties are ignored.
 * Missing properties are included as `undefined` in the result.
 */
export function pick<
  const T extends GenericRecord,
  const K extends keyof T,
  const C extends ((key: K, value: T[keyof T]) => any) | undefined = undefined,
>(obj: T, keys: readonly K[], callback?: C): Picked<T, K, C>;
export function pick(
  obj: Record<PropertyKey, any>,
  keys: readonly PropertyKey[],
  callback?: (key: PropertyKey, value: any) => any,
): Record<PropertyKey, any> {
  const output: Record<PropertyKey, any> = {};

  if (isFunction(callback))
    for (const key of keys) {
      output[key] = callback(key, obj[key]);
    }
  else
    for (const key of keys) {
      output[key] = obj[key];
    }

  return output;
}
