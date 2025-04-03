import type { ObjectType } from "../types";

/**
 * Helper type that gets the "real" type of a property descriptor.
 * First tries the `value` property if it exists, then falls back to the `get` and `set` properties.
 */
export type PropertyDescriptorType<T extends PropertyDescriptor> = T extends {
  value: infer V;
}
  ? V
  : T extends { get(): infer G }
  ? G
  : T extends { set(): infer S }
  ? S
  : unknown;

export function defineProperty<
  T extends ObjectType,
  K extends PropertyKey,
  V extends PropertyDescriptor
>(obj: T, key: K, descriptor: V): T & { [P in K]: PropertyDescriptorType<V> };
export function defineProperty(
  obj: ObjectType,
  key: PropertyKey,
  descriptor: PropertyDescriptor
): ObjectType {
  return Object.defineProperty(obj, key, descriptor);
}
