import { defineMethod } from "~/compiler";
import { isPropertyKey } from "~/primitives/methods";
import type { GenericRecord } from "../types";

export default defineMethod({
  instanceCallable: true,
});

/**
 * Returns an object with the provided properties pulled out of the input object.
 * The properties are removed from the input object.
 *
 * If you want to get a subset of properties without touching the input object, use `O.pick()` instead.
 */
export function pull<
  const T extends GenericRecord,
  const K extends keyof T | readonly (keyof T | PropertyKey)[],
>(
  obj: T,
  keyOrKeys: K,
): K extends readonly PropertyKey[]
  ? Pick<T, K[number] & keyof T>
  : K extends keyof T
    ? T[K]
    : never;
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
