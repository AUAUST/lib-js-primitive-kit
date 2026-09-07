import { isArray } from "~/arrays/methods";
import { defineMethod } from "~/compiler";
import type { HasKeysOptions, WithKeys } from "~/objects/types";
import type { GenericRecord } from "~/shared/types";
import { isObject } from "./isObject";

export default defineMethod({
  instanceCallable: true,
});

/**
 * Checks whether an object has keys.
 * Allows to pass an array of keys to check for; if absent, checks for any own property.
 * Passing something that isn't an Object as the first argument will return false.
 */
export function hasKeys<
  const T extends GenericRecord<PropertyKey>,
  const O extends readonly PropertyKey[] | HasKeysOptions | undefined =
    undefined,
>(object: T, options?: O): object is T & WithKeys<O>;
export function hasKeys<
  const T extends GenericRecord<number>,
  const O extends readonly PropertyKey[] | HasKeysOptions | undefined =
    undefined,
>(array: T, options?: O): array is T;
export function hasKeys(
  object: unknown,
  options?: PropertyKey[] | HasKeysOptions,
): boolean {
  if (!isObject(object, true)) {
    return false;
  }

  const {
    symbols = false,
    keys = false,
    onlyEnumerable = true,
  } = isArray(options) ? { keys: options } : (options ?? {});

  if (keys) {
    for (const key of keys) {
      if (!object.hasOwnProperty(key)) {
        return false;
      }
    }

    return true;
  }

  if (isArray(object)) {
    return object.length > 0;
  }

  if (onlyEnumerable) {
    if (Object.keys(object).length > 0) {
      return true;
    }
  } else if (Object.getOwnPropertyNames(object).length > 0) {
    return true;
  }

  if (symbols && Object.getOwnPropertySymbols(object).length > 0) {
    return true;
  }

  return false;
}
