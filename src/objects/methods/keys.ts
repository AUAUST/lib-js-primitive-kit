import type { IfAny, IfUnknown } from "type-fest";
import { isArray } from "~/arrays/methods";

/**
 * A type function that returns the keys of an object as a string literal type.
 */
export type Keys<T> = IfAny<
  T,
  UnknownKeys,
  IfUnknown<
    T,
    UnknownKeys,
    T extends any[]
      ? number[]
      : keyof T extends never
      ? string[]
      : T extends object
      ? (keyof T)[]
      : UnknownKeys
  >
>;

/**
 * The type used to type the keys of an object when we can't stricly type them.
 * It can either be an array of numbers if the value is an array, or an array of strings if the value is an object.
 * There can't be mix of strings and numbers.
 */
export type UnknownKeys = string[] | number[];

export function keys<T extends Object>(obj: T | null | undefined): Keys<T> {
  if (!obj) {
    return <any>[];
  }

  if (isArray(obj)) {
    return <any>Array.from(obj.keys());
  }

  return <any>Object.keys(obj);
}
