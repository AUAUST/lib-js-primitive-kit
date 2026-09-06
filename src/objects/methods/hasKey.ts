import { defineMethod } from "~/compiler";
import type { GenericRecord } from "../types";
import { isObject } from "./isObject";

export default defineMethod({
  instanceCallable: true,
});

/**
 * Returns a boolean whether the given key is present in the given object. Equivalent to `key in obj`.
 * If you need to check for multiple keys, use `O.hasKeys()` instead.
 */
export function hasKey<T extends GenericRecord, K extends PropertyKey>(
  obj: T,
  key: K,
): obj is T & {
  [P in K]: P extends keyof T ? T[P] : unknown;
};
export function hasKey(key: PropertyKey, obj: GenericRecord): boolean;
export function hasKey(
  objOrKey: GenericRecord | PropertyKey,
  keyOrObj: PropertyKey | GenericRecord,
): boolean {
  const [obj, key] = isObject(objOrKey, true)
    ? [objOrKey, keyOrObj as PropertyKey]
    : [keyOrObj, objOrKey];

  return !!obj && isObject(obj, true) && key in obj;
}
