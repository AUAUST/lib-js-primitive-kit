import type { IfNever } from "type-fest";
import { isArray } from "~/arrays/methods";
import type { ObjectType } from "../types";

export type ToObject<T> = T extends null | undefined
  ? ObjectType
  : T extends (infer R)[]
    ? IfNever<R, ObjectType, { [K: `${number}`]: ToObject<R> }>
    : T extends number
      ? Number
      : T extends string
        ? String
        : T extends boolean
          ? Boolean
          : T;

/**
 * Converts any value to an object.
 * `null` and `undefined` are converted to empty objects.
 * Arrays are converted using `Object.assign()`.
 * Booleans, numbers and strings are converted to objects by being passed to the Object constructor.
 * All other values are returned as-is.
 */
export function toObject(obj?: null | undefined): ObjectType;
export function toObject<T extends ObjectType>(obj: T): T;
export function toObject<T>(obj: T): ToObject<T>;
export function toObject(obj: unknown): ObjectType {
  return isArray(obj)
    ? // @ts-expect-error Object.assign() infers the return type as `any[]` despite it actually being `Record<string, any>`
      Object.assign({}, obj)
    : Object(obj);
}
