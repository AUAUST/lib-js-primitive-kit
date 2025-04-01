import { isArray } from "~/arrays/methods";
import type { HasKeysOptions, WithKeys } from "~/objects/types";
import { isObject } from "./isObject";

export function hasKeys<
  T extends object,
  O extends PropertyKey[] | HasKeysOptions | undefined = undefined
>(obj: T, options?: O): obj is T & WithKeys<O> {
  if (!isObject(obj, true)) return false;

  const {
    symbols = false,
    keys = false,
    onlyEnumerable = true,
  } = isArray(options) ? { keys: options } : options ?? {};

  if (!keys) {
    if (isArray(obj)) return obj.length > 0;

    if (onlyEnumerable) {
      if (Object.keys(obj).length > 0) {
        return true;
      }
    } else if (Object.getOwnPropertyNames(obj).length > 0) {
      return true;
    }

    if (symbols && Object.getOwnPropertySymbols(obj).length > 0) {
      return true;
    }

    return false;
  }

  // If a list of keys is provided, we check for each of them.
  for (const key of keys) {
    if (!obj.hasOwnProperty(key)) {
      return false;
    }
  }

  return true;
}
