import type { ObjectType } from "../types";
import { isObject } from "./isObject";

/**
 * Returns a boolean whether the given key is present in the given object. Equivalent to `key in obj`.
 * If you need to check for multiple keys, use `O.hasKeys()` instead.
 */
export function hasKey<K extends PropertyKey, T extends ObjectType | any[]>(
  key: K,
  obj: T,
): obj is T & {
  [P in K]: P extends keyof T ? T[P] : unknown;
} {
  return !!obj && isObject(obj, true) && key in obj;
}
