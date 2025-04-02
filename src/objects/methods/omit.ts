import { isFunction } from "~/functions/methods";

export type Omitted<
  T extends object,
  K extends keyof T,
  C extends ((key: K, value: T[K]) => any) | undefined = undefined
> = {
  -readonly [P in Exclude<keyof T, K>]: C extends (
    key: P,
    value: T[P]
  ) => infer R
    ? R
    : T[P];
};

export function omit<
  T extends object,
  K extends keyof T,
  C extends ((key: K, value: T[keyof T]) => any) | undefined = undefined
>(obj: T, keys: readonly K[], callback?: C): Omitted<T, K, C> {
  const output = {} as Omitted<T, K, C>,
    keySet = new Set(keys);

  if (isFunction(callback)) {
    for (const key in obj) {
      if (!keySet.has(<any>key)) {
        // @ts-expect-error
        output[key] = callback(key, obj[key]);
      }
    }
  } else {
    for (const key in obj) {
      if (!keySet.has(<any>key)) {
        // @ts-expect-error
        output[key] = obj[key];
      }
    }
  }

  return output;
}
