import { wrap } from "~/arrays/methods";
import { defineMethod } from "~/compiler";
import type { GenericRecord } from "~/objects/types";
import { isString } from "~/strings/methods";

export default defineMethod({
  instanceCallable: true,
});

type DeepValue<T, P extends string> = P extends `${infer K}.${infer Rest}`
  ? K extends keyof T
    ? DeepValue<T[K], Rest>
    : never
  : P extends keyof T
    ? T[P]
    : never;

type Prev = [never, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

type DotPaths<T, D extends number = 6> = [D] extends [never]
  ? never
  : T extends object
    ? {
        [K in Extract<keyof T, string>]: T[K] extends object
          ? `${K}` | `${K}.${DotPaths<T[K], Prev[D]>}`
          : `${K}`;
      }[Extract<keyof T, string>]
    : never;

/**
 * Deeply gets a value from an object, each key being a nested property.
 * If only one key is passed, it'll try to access the property using dot notation.
 * If you need to access a nested property that contains a dot, it'll work as expected.
 * If you need to access a root property that contains a dot, you must pass `false` as the second argument.
 *
 * @example ```ts
 * const obj = {
 *   foo: {
 *     bar: [ "value" ]
 *   },
 *   "foo.bar.0": {
 *     baz: 1
 *   }
 * };
 *
 * O.deepGet(obj, "foo", "bar", 0); // "value"
 * O.deepGet(obj, "foo.bar.0", "baz"); // 1
 * O.deepGet(obj, "foo.bar.0"); // "value"
 * O.deepGet(obj, "foo.bar.0", false); // { baz: 1 }
 * ```
 */
export function deepGet<const T extends GenericRecord>(obj: T): T;
export function deepGet<const T extends GenericRecord, const K extends DotPaths<T>>(
  obj: T,
  key: K,
): DeepValue<T, K>;
export function deepGet<const T extends GenericRecord, const K1 extends keyof T>(
  obj: T,
  k1: K1,
): T[K1];
export function deepGet<
  const T extends GenericRecord,
  const K1 extends keyof T,
  const K2 extends keyof T[K1],
>(obj: T, k1: K1, k2: K2): T[K1][K2];
export function deepGet<
  const T extends GenericRecord,
  const K1 extends keyof T,
  const K2 extends keyof T[K1],
  const K3 extends keyof T[K1][K2],
>(obj: T, k1: K1, k2: K2, k3: K3): T[K1][K2][K3];
export function deepGet<
  const T extends GenericRecord,
  const K1 extends keyof T,
  const K2 extends keyof T[K1],
  const K3 extends keyof T[K1][K2],
  const K4 extends keyof T[K1][K2][K3],
>(obj: T, k1: K1, k2: K2, k3: K3, k4: K4): T[K1][K2][K3][K4];
export function deepGet<
  const T extends GenericRecord,
  const K1 extends keyof T,
  const K2 extends keyof T[K1],
  const K3 extends keyof T[K1][K2],
  const K4 extends keyof T[K1][K2][K3],
  const K5 extends keyof T[K1][K2][K3][K4],
>(obj: T, k1: K1, k2: K2, k3: K3, k4: K4, k5: K5): T[K1][K2][K3][K4][K5];
export function deepGet<
  const T extends GenericRecord,
  const K1 extends keyof T,
  const K2 extends keyof T[K1],
  const K3 extends keyof T[K1][K2],
  const K4 extends keyof T[K1][K2][K3],
  const K5 extends keyof T[K1][K2][K3][K4],
  const K6 extends keyof T[K1][K2][K3][K4][K5],
>(
  obj: T,
  k1: K1,
  k2: K2,
  k3: K3,
  k4: K4,
  k5: K5,
  k6: K6,
): T[K1][K2][K3][K4][K5][K6];
export function deepGet(
  obj: GenericRecord | any[],
  parts: PropertyKey[],
): unknown;
export function deepGet(
  obj: GenericRecord | any[],
  ...parts: PropertyKey[]
): unknown;
export function deepGet(
  obj: GenericRecord | any[] | null | undefined,
  partOrParts?: PropertyKey | PropertyKey[],
  ...parts: PropertyKey[]
): unknown {
  if (arguments.length < 2) {
    return obj; // If the function is called without any key or part, return the object.
  }

  const separator = ".";

  // If no parts are provided, it means partOrParts is the whole path.
  if (parts.length === 0) {
    // If partOrParts is a string, split it into parts using the separator.
    if (isString(partOrParts)) {
      parts = partOrParts.split(separator);
    }

    // Otherwise, ensure it's an array. Might either be a number or symbol wrapped in an array,
    // or partOrParts is already an array.
    else {
      parts = wrap(partOrParts);
    }
  }

  // If parts are provided, it means the spread syntax is used.
  // In this case, we append partOrParts to the parts array.
  else {
    parts = wrap(partOrParts).concat(parts);
  }

  let carry: any = obj;

  for (const part of parts) {
    carry = carry?.[part];

    if (carry === undefined) {
      return undefined;
    }
  }

  return carry;
}
