import { defineMethod } from "~/compiler";
import type { GenericRecord } from "~/shared/types";
import { isObject } from "./isObject";

export default defineMethod({
  methodAliases: ["in"],
  instanceCallable: true,
});

/**
 * Returns a boolean whether the given key is present in the given object. Equivalent to `key in obj`.
 * If you need to check for multiple keys, use `O.hasKeys()` instead.
 */
export function hasKey<
  const T extends GenericRecord<PropertyKey>,
  const K extends PropertyKey,
>(
  object: T,
  key: K,
): object is T & {
  [P in K]: P extends keyof T ? T[P] : unknown;
};
export function hasKey<
  const T extends GenericRecord<number>,
  const K extends PropertyKey,
>(
  array: T,
  key: K,
): array is T & {
  [P in K]: P extends keyof T ? T[P] : unknown;
};
export function hasKey(object: GenericRecord, key: PropertyKey): boolean {
  return !!object && isObject(object, true) && key in object;
}
