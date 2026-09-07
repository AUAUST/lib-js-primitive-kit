import { isArray } from "~/arrays/methods";
import { defineMethod } from "~/compiler";
import type { GenericRecord } from "~/shared/types";
import type { ToObject } from "../types";

export default defineMethod({
  methodAliases: ["from"],
});

/**
 * Converts any value to an object.
 * `null` and `undefined` are converted to empty objects.
 * Arrays are converted using `Object.assign()`.
 * Booleans, numbers and strings are converted to objects by being passed to the Object constructor.
 * All other values are returned as-is.
 */
export function toObject(obj?: null | undefined): GenericRecord;
export function toObject<const T extends GenericRecord>(obj: T): T;
export function toObject<const T>(obj: T): ToObject<T>;
export function toObject(obj: unknown): GenericRecord {
  return isArray(obj)
    ? // @ts-expect-error Object.assign() infers the return type as `any[]` despite it actually being `Record<string, any>`
      Object.assign({}, obj)
    : Object(obj);
}
