import { isArray } from "~/arrays/methods";
import { defineMethod } from "~/compiler";
import type { IfNever } from "~/shared/types";
import type { GenericRecord } from "../types";

export default defineMethod({
  methodAliases: ["from"],
});

export type ToObject<T> = T extends null | undefined
  ? GenericRecord<string>
  : T extends GenericRecord
    ? T
    : T extends readonly (infer R)[]
      ? { [K: `${number}`]: IfNever<R, unknown, R> }
      : T extends number
        ? Number
        : T extends string
          ? String
          : T extends boolean
            ? Boolean
            : T extends object
              ? T
              : Object;

/**
 * Converts any value to an object.
 * `null` and `undefined` are converted to empty objects.
 * Arrays are converted using `Object.assign()`.
 * Booleans, numbers and strings are converted to objects by being passed to the Object constructor.
 * All other values are returned as-is.
 */
export function toObject(obj?: null | undefined): GenericRecord;
export function toObject<T extends GenericRecord>(obj: T): T;
export function toObject<T>(obj: T): ToObject<T>;
export function toObject(obj: unknown): GenericRecord {
  return isArray(obj)
    ? // @ts-expect-error Object.assign() infers the return type as `any[]` despite it actually being `Record<string, any>`
      Object.assign({}, obj)
    : Object(obj);
}
