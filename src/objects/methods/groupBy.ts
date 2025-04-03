import { isFunction } from "~/functions/methods";
import { isPropertyKey } from "~/primitives/methods";
import { isObject } from "./isObject";

export function groupBy<K extends PropertyKey, T>(
  arr: readonly T[],
  mapper: (arg: T, index: number) => K
): Record<K, T[]>;
export function groupBy<
  Object extends Record<PropertyKey, any>,
  AccessedProperty extends keyof Object
>(
  arr: readonly Object[],
  key: AccessedProperty
): {
  [MappingValue in Object[AccessedProperty]]: Extract<
    Object,
    { [Key in AccessedProperty]: MappingValue }
  >[];
};
export function groupBy(
  arr: readonly unknown[],
  keyOrMapper: PropertyKey | ((arg: unknown, index: number) => PropertyKey)
): Record<PropertyKey, unknown[]> {
  const output = {} as Record<PropertyKey, unknown[]>;
  let i = 0;

  if (isFunction(keyOrMapper)) {
    for (const val of arr) {
      const key = keyOrMapper(val, i++);

      if (!output[key]) {
        output[key] = [];
      }

      output[key].push(val);
    }

    return output;
  }

  for (const item of arr) {
    if (!isObject(item)) {
      continue;
    }

    const key = item[keyOrMapper as never];

    if (!isPropertyKey(key)) {
      continue;
    }

    if (!output[key]) {
      output[key] = [];
    }

    output[key].push(item);
  }

  return output;
}
