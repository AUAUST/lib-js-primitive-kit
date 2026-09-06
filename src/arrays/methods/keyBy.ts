import { IfNever } from "type-fest";
import type { Arrayable, ArrayValue } from "~/arrays/types";
import { defineMethod } from "~/compiler";
import type { GenericRecord } from "~/objects/types";
import { isPropertyKey } from "~/primitives/methods";
import { toArray } from "./toArray";

export default defineMethod({
  instanceCallable: true,
});

/**
 * Converts an array of objects into an object keyed by a specified property.
 */
export function keyBy<T extends Arrayable, K extends keyof ArrayValue<T>>(
  arr: T,
  key: IfNever<K, PropertyKey, K>,
): T extends Arrayable<infer U>
  ? {
      [P in ArrayValue<T> as K extends keyof P & PropertyKey ? P[K] : never]: P;
    }
  : never;
export function keyBy(arr: Arrayable, key: PropertyKey) {
  const out: GenericRecord<PropertyKey> = {};
  let k: PropertyKey;

  for (const v of toArray(arr)) {
    if (v && isPropertyKey((k = v[key]))) {
      out[k] = v;
    }
  }

  return out;
}
