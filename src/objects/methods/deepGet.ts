import { isNumber } from "~/numbers/methods";
import type { DeepGet, DeepGetFunction } from "~/objects/types";
import { isString } from "~/strings/methods";

/**
 * Deeply gets a value from an object, each key being a nested property.
 * If only one key is passed, it'll try to access the property using dot notation.
 * If you need to access a nested property that contains a dot, it'll work as expected.
 * If you need to access a root property that contains a dot, you must pass `false` as the second argument.
 *
 * @example ```ts
 * const obj = {
 *   foo: {
 *     bar: [ "value" ]
 *   },
 *   "foo.bar.0": {
 *     baz: 1
 *   }
 * };
 *
 * O.deepGet(obj, "foo", "bar", 0); // "value"
 * O.deepGet(obj, "foo.bar.0", "baz"); // 1
 * O.deepGet(obj, "foo.bar.0"); // "value"
 * O.deepGet(obj, "foo.bar.0", false); // { baz: 1 }
 * ```
 */
export const deepGet: DeepGetFunction = function deepGet<
  T,
  K extends PropertyKey[]
>(obj: T, ...keys: K): DeepGet<T, K> {
  if (keys.length === 0) {
    return obj as DeepGet<T, K>;
  }

  if (keys.length === 1) {
    keys = (keys[0] as string).split(".") as K;
  }

  if (keys.length === 2 && !isString(keys[1]) && !isNumber(keys[1])) {
    keys.pop();
  }

  let value = obj;

  for (const key of keys) {
    value = (<any>value)?.[key];

    if (value === undefined) {
      return undefined as DeepGet<T, K>;
    }
  }

  return value as DeepGet<T, K>;
};
