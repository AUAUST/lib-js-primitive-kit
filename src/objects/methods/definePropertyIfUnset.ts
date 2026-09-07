import { defineMethod } from "~/compiler";
import type { GenericRecord } from "~/shared/types";
import type { PropertyDescriptorType } from "../types";

export default defineMethod({
  instanceCallable: "chainable",
});

/**
 * Defines a property on an object, only if it doesn't exist yet.
 */
export function definePropertyIfUnset<
  const T extends GenericRecord,
  const K extends PropertyKey,
  V extends PropertyDescriptor,
>(
  obj: T,
  key: K,
  value: V,
): T & { [P in K]: P extends keyof T ? T[P] : PropertyDescriptorType<V> };
export function definePropertyIfUnset(
  obj: GenericRecord,
  key: PropertyKey,
  descriptor: PropertyDescriptor,
): GenericRecord {
  if (obj?.hasOwnProperty(key)) {
    return obj;
  }

  return Object.defineProperty(obj, key, descriptor);
}
