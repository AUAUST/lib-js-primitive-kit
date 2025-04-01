import { isFunction } from "~/functions/methods";
import type { DeepEndKeys, GetValueFromDotNotation } from "~/objects/types";
import { isPropertyKey } from "~/primitives/methods";
import { entries } from "./entries";
import { isStrictObject } from "./isStrictObject";

export function flat<
  T extends object,
  S extends string | ((keys: PropertyKey[]) => PropertyKey)
>(
  obj: T,
  separator?: S,
  _keys: PropertyKey[] = [],
  _accumulator: any = {}
): {
  [K in DeepEndKeys<T, S>]: GetValueFromDotNotation<T, K, S>;
} {
  const makeKey: (keys: PropertyKey[]) => PropertyKey = (() => {
    if (isFunction(separator)) {
      return (...args) => {
        const key = (separator as (keys: PropertyKey[]) => PropertyKey)(
          ...args
        );

        // Ensures the custom function returns a valid key.
        if (!isPropertyKey(key)) {
          throw new TypeError(
            `Invalid key ${String(
              key
            )} of type ${typeof key} returned by separator function.`
          );
        }

        return key;
      };
    }

    separator = String(separator ?? ".") as S;

    return (keys: PropertyKey[]) => keys.join(separator as string);
  })();

  for (const [key, value] of entries(obj)) {
    const keys = [..._keys, key];

    if (isStrictObject(value)) {
      flat(value, separator, keys, _accumulator);
    } else {
      _accumulator[makeKey(keys)] = value;
    }
  }

  return _accumulator;
}
