import { isFunction } from "~/functions/methods";

export type Picked<
  T extends object,
  K extends keyof T,
  C extends ((key: K, value: T[K]) => any) | undefined = undefined
> = {
  -readonly [P in K]: C extends (key: P, value: T[P]) => infer R ? R : T[P];
};

export function pick<
  T extends Record<PropertyKey, any>,
  K extends keyof T,
  C extends ((key: K, value: T[keyof T]) => any) | undefined = undefined
>(obj: T, keys: readonly K[], callback?: C): Picked<T, K, C>;
export function pick(
  obj: Record<PropertyKey, any>,
  keys: readonly PropertyKey[],
  callback?: (key: PropertyKey, value: any) => any
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
