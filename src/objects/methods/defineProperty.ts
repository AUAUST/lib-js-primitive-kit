import { defineMethod } from "~/compiler";
import type { GenericRecord } from "../types";

export default defineMethod({
  instanceCallable: "chainable",
});

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
  T extends GenericRecord,
  K extends PropertyKey,
  V extends PropertyDescriptor,
>(obj: T, key: K, descriptor: V): T & { [P in K]: PropertyDescriptorType<V> };
export function defineProperty(
  obj: GenericRecord,
  key: PropertyKey,
  descriptor: PropertyDescriptor,
): GenericRecord {
  return Object.defineProperty(obj, key, descriptor);
}
