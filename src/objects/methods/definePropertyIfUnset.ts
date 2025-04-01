import type { ObjectWithProperty } from "~/objects/types";

export function definePropertyIfUnset<
  T,
  K extends PropertyKey,
  D extends PropertyDescriptor
>(
  obj: T,
  key: K,
  descriptor: D
): K extends keyof T ? T : ObjectWithProperty<T, K, D> {
  if (obj?.hasOwnProperty(key)) {
    return <any>obj;
  }

  return <any>Object.defineProperty(obj, key, descriptor);
}
