import { defineMethod } from "~/compiler";
import { isFunction } from "~/functions/methods";
import type { DeepValues } from "~/objects/types";
import { isPropertyKey } from "~/primitives/methods";
import type {
  GenericRecord,
  IfNever,
  UnionToIntersection,
} from "~/shared/types";
import { entries } from "./entries";
import { isPlainObject } from "./isPlainObject";

export default defineMethod({
  instanceCallable: "chainable",
});

export type Flatten<T, S extends string, P extends string = ""> =
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

export type Flat<T, S extends string> = IfNever<
  keyof T,
  T,
  UnionToIntersection<Flatten<T, S>> extends infer U
    ? { [K in keyof U]: U[K] }
    : never
>;

/**
 * Deeply flattens an object.
 * Returns a new object where all properties are at the root level, with the keys using dot notation by default.
 *
 * A separator might be provided to use a different notation.
 * It may either be a string in which case it'll be used to join the keys, or a function that takes the keys as arguments and returns a string, number or symbol.
 */
export function flat<const T extends GenericRecord>(obj: T): Flat<T, ".">;

export function flat<const T extends GenericRecord, const S extends string>(
  obj: T,
  separator: S,
): Flat<T, S>;

export function flat<
  const T extends GenericRecord,
  const K extends PropertyKey,
>(
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
