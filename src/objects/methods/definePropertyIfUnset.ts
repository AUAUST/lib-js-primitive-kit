import type { ObjectType } from "../types";
import type { PropertyDescriptorType } from "./defineProperty";

/**  Defines a property on an object, only if it doesn't exist yet. */
export function definePropertyIfUnset<
  T extends ObjectType,
  K extends PropertyKey,
  V extends PropertyDescriptor,
>(
  obj: T,
  key: K,
  value: V,
): T & { [P in K]: P extends keyof T ? T[P] : PropertyDescriptorType<V> };
export function definePropertyIfUnset(
  obj: ObjectType,
  key: PropertyKey,
  descriptor: PropertyDescriptor,
): ObjectType {
  if (obj?.hasOwnProperty(key)) {
    return obj;
  }

  return Object.defineProperty(obj, key, descriptor);
}
