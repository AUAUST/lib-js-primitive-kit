import { defineMethod } from "~/compiler";
import type { GenericRecord } from "~/shared/types";
import type { PropertyDescriptorType } from "../types";

export default defineMethod({
  instanceCallable: "chainable",
});

export function defineProperty<
  const T extends GenericRecord,
  const K extends PropertyKey,
  V extends PropertyDescriptor,
>(obj: T, key: K, descriptor: V): T & { [P in K]: PropertyDescriptorType<V> };
export function defineProperty(
  obj: GenericRecord,
  key: PropertyKey,
  descriptor: PropertyDescriptor,
): GenericRecord {
  return Object.defineProperty(obj, key, descriptor);
}
