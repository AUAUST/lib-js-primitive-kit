import type { IfAny, IfUnknown } from "type-fest";
import { isArray } from "~/arrays/methods";

/**
 * A type function that returns the values of an object as a union type.
 */
export type Values<T> = IfAny<
  T,
  unknown[],
  IfUnknown<
    T,
    unknown[],
    T extends any[]
      ? T[number][]
      : keyof T extends never
      ? unknown[]
      : T extends object
      ? T[keyof T][]
      : unknown[]
  >
>;

export function values<T extends Object | any[] | null | undefined>(
  obj: T
): Values<T> {
  if (!obj) {
    return <any>[];
  }

  if (isArray(obj)) {
    return <any>obj;
  }

  return <any>Object.values(obj);
}
