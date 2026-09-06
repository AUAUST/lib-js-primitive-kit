import type { Arrayable } from "~/arrays/types";
import { defineMethod } from "~/compiler";
import type { ObjectType } from "~/objects/types";
import { isPropertyKey } from "~/primitives/methods";
import { toArray } from "./toArray";

export default defineMethod({
  instanceCallable: true,
});

/**
 * Converts an array of objects into an object keyed by a specified property.
 */
export function keyBy<
  T extends Record<PropertyKey, any>,
  K extends keyof T & PropertyKey,
>(arr: Arrayable<T>, key: K): Record<T[K] & PropertyKey, T>;
export function keyBy(arr: Arrayable, key: PropertyKey) {
  const out: ObjectType = {};
  let k: PropertyKey;

  for (const v of toArray(arr)) {
    if (v && isPropertyKey((k = v[key]))) {
      out[k] = v;
    }
  }

  return out;
}
