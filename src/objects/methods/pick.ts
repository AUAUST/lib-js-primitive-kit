import { isFunction } from "~/functions/methods";
import type { Picked } from "~/objects/types";

export function pick<
  T extends Record<PropertyKey, any>,
  K extends keyof T,
  C extends ((key: K, value: T[keyof T]) => any) | undefined = undefined
>(obj: T, keys: readonly K[], callback?: C): Picked<T, K, C> {
  const output = {} as Picked<T, K, C>;

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
