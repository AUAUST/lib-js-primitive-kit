import { isPropertyKey } from "~/primitives/methods";

export function pull<T extends object, K extends keyof T>(obj: T, key: K): T[K];
export function pull<
  T extends object,
  K extends readonly (keyof T | PropertyKey)[]
>(obj: T, keys: K): Pick<T, K[number] & keyof T>;

export function pull(
  obj: Record<PropertyKey, any>,
  keyOrKeys: PropertyKey | readonly PropertyKey[]
): unknown {
  if (isPropertyKey(keyOrKeys)) {
    const out = obj[keyOrKeys];

    delete obj[keyOrKeys];

    return out;
  }

  const out: Record<PropertyKey, any> = {};

  for (const key of keyOrKeys) {
    if (key in obj) {
      out[key] = obj[key];
      delete obj[key];
    }
  }

  return out;
}
