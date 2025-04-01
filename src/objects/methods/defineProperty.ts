import type { ObjectWithProperty } from "~/objects/types";

export function defineProperty<
  T,
  K extends PropertyKey,
  D extends PropertyDescriptor
>(obj: T, key: K, descriptor: D): ObjectWithProperty<T, K, D> {
  return <any>Object.defineProperty(obj, key, descriptor);
}
