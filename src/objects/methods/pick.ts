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
