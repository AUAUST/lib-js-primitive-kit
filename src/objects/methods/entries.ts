import type { IfAny, IfUnknown } from "type-fest";
import { isArray } from "~/arrays/methods";

/**
 * A type function that returns the entries of an object as a tuple type.
 */
export type Entries<T> = IfAny<
  T,
  [string, unknown][] | [number, unknown][],
  IfUnknown<
    T,
    [string, unknown][] | [number, unknown][],
    T extends []
      ? []
      : keyof T extends never
      ? []
      : T extends any[]
      ? [number, T[number]][]
      : T extends Record<string | number, any>
      ? NonNullable<
          {
            [K in keyof T]: [K, T[K]];
          }[keyof T]
        >[]
      : []
  >
>;

export function entries<T extends Object | any[] | null | undefined>(
  obj: T
): Entries<T> {
  if (!obj) {
    return <any>[];
  }

  if (isArray(obj)) {
    return <any>Array.from(obj.entries());
  }

  return <any>Object.entries(obj);
}
