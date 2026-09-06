import type { IfNever, UnionToIntersection } from "type-fest";
import { defineMethod } from "~/compiler";
import { isFunction } from "~/functions/methods";
import type { DeepValues, GenericRecord } from "~/objects/types";
import { isPropertyKey } from "~/primitives/methods";
import { entries } from "./entries";
import { isPlainObject } from "./isPlainObject";

export default defineMethod({
  instanceCallable: "chainable",
});

type Merge<T> = {
  [K in keyof T]: T[K];
};

type Flatten<T, S extends string, P extends string = ""> =
  // Avoids infinite recursion when the object keys are generic
  PropertyKey extends keyof T
    ? GenericRecord
    : {
        [K in keyof T]: T[K] extends GenericRecord
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
export function flat<T extends GenericRecord>(obj: T): Flat<T, ".">;

export function flat<T extends GenericRecord, S extends string>(
  obj: T,
  separator: S,
): Flat<T, S>;

export function flat<T extends GenericRecord, K extends PropertyKey>(
  obj: T,
  keyFn: (keys: PropertyKey[]) => K | undefined,
): Record<K, DeepValues<T>>;

export function flat(
  obj: GenericRecord,
  separator?: string | ((k: PropertyKey[]) => PropertyKey | undefined),
  keys?: PropertyKey[],
  accumulator?: GenericRecord,
): GenericRecord;

export function flat(
  obj: GenericRecord,
  separator: string | ((k: PropertyKey[]) => PropertyKey | undefined) = ".",
  keys: PropertyKey[] = [],
  accumulator: GenericRecord<PropertyKey> = {},
): GenericRecord {
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
