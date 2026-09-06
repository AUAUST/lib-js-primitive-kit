import type { IfNever, UnionToIntersection } from "type-fest";
import { isFunction } from "~/functions/methods";
import type { DeepValues, ObjectType } from "~/objects/types";
import { isPropertyKey } from "~/primitives/methods";
import { entries } from "./entries";
import { isPlainObject } from "./isPlainObject";

type Merge<T> = {
  [K in keyof T]: T[K];
};

type Flatten<T, S extends string, P extends string = ""> =
  // Avoids infinite recursion when the object keys are generic
  PropertyKey extends keyof T
    ? ObjectType
    : {
        [K in keyof T]: T[K] extends ObjectType
          ? Flatten<T[K], S, `${P}${K & string}${S}`>
          : {
              [Key in `${P}${K & string}`]: T[K];
            };
      }[keyof T];

type Flat<T, S extends string> = IfNever<
  keyof T,
  T,
  Merge<UnionToIntersection<Flatten<T, S>>>
>;

/**
 * Deeply flattens an object.
 * Returns a new object where all properties are at the root level, with the keys using dot notation by default.
 *
 * A separator might be provided to use a different notation.
 * It may either be a string in which case it'll be used to join the keys, or a function that takes the keys as arguments and returns a string, number or symbol.
 */
export function flat<T extends ObjectType>(obj: T): Flat<T, ".">;

export function flat<T extends ObjectType, S extends string>(
  obj: T,
  separator: S,
): Flat<T, S>;

export function flat<T extends ObjectType, K extends PropertyKey>(
  obj: T,
  keyFn: (keys: PropertyKey[]) => K | undefined,
): Record<K, DeepValues<T>>;

export function flat(
  obj: ObjectType,
  separator?: string | ((k: PropertyKey[]) => PropertyKey | undefined),
  keys?: PropertyKey[],
  accumulator?: ObjectType,
): ObjectType;

export function flat(
  obj: ObjectType,
  separator: string | ((k: PropertyKey[]) => PropertyKey | undefined) = ".",
  keys: PropertyKey[] = [],
  accumulator: ObjectType = {},
): ObjectType {
  for (const [key, value] of entries(obj)) {
    const newKeys = [...keys, key];

    if (isPlainObject(value)) {
      flat(value, separator, newKeys, accumulator);
    } else {
      const key = isFunction(separator)
        ? separator(newKeys)
        : newKeys.join(separator);

      // If the separator function returns undefined, skip this key
      if (key === undefined) {
        continue;
      }

      if (!isPropertyKey(key)) {
        throw new TypeError(
          `separator function returned invalid property key: ${String(key)}`,
        );
      }

      accumulator[key] = value;
    }
  }

  return accumulator;
}
