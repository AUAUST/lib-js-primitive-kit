import { isPropertyKey } from "~/primitives/methods";

/**
 * Returns an object with the provided properties pulled out of the input object.
 * The properties are removed from the input object.
 *
 * If you want to get a subset of properties without touching the input object, use `O.pick()` instead.
 */
export function pull<T extends object, K extends keyof T>(obj: T, key: K): T[K];
export function pull<
  T extends object,
  K extends readonly (keyof T | PropertyKey)[],
>(obj: T, keys: K): Pick<T, K[number] & keyof T>;
export function pull(
  obj: Record<PropertyKey, any>,
  keyOrKeys: PropertyKey | readonly PropertyKey[],
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
