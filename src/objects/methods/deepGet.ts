import { wrap } from "~/arrays/methods";
import type { ObjectType } from "~/objects/types";
import { isString } from "~/strings/methods";

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

export function deepGet<T>(obj: T): T;
export function deepGet<T, K extends DotPaths<T>>(
  obj: T,
  key: K
): DeepValue<T, K>;
export function deepGet<T, K1 extends keyof T>(obj: T, k1: K1): T[K1];
export function deepGet<T, K1 extends keyof T, K2 extends keyof T[K1]>(
  obj: T,
  k1: K1,
  k2: K2
): T[K1][K2];
export function deepGet<
  T,
  K1 extends keyof T,
  K2 extends keyof T[K1],
  K3 extends keyof T[K1][K2]
>(obj: T, k1: K1, k2: K2, k3: K3): T[K1][K2][K3];
export function deepGet<
  T,
  K1 extends keyof T,
  K2 extends keyof T[K1],
  K3 extends keyof T[K1][K2],
  K4 extends keyof T[K1][K2][K3]
>(obj: T, k1: K1, k2: K2, k3: K3, k4: K4): T[K1][K2][K3][K4];
export function deepGet<
  T,
  K1 extends keyof T,
  K2 extends keyof T[K1],
  K3 extends keyof T[K1][K2],
  K4 extends keyof T[K1][K2][K3],
  K5 extends keyof T[K1][K2][K3][K4]
>(obj: T, k1: K1, k2: K2, k3: K3, k4: K4, k5: K5): T[K1][K2][K3][K4][K5];
export function deepGet<
  T,
  K1 extends keyof T,
  K2 extends keyof T[K1],
  K3 extends keyof T[K1][K2],
  K4 extends keyof T[K1][K2][K3],
  K5 extends keyof T[K1][K2][K3][K4],
  K6 extends keyof T[K1][K2][K3][K4][K5]
>(
  obj: T,
  k1: K1,
  k2: K2,
  k3: K3,
  k4: K4,
  k5: K5,
  k6: K6
): T[K1][K2][K3][K4][K5][K6];
export function deepGet(obj: ObjectType | any[], parts: PropertyKey[]): unknown;
export function deepGet(
  obj: ObjectType | any[],
  ...parts: PropertyKey[]
): unknown;
export function deepGet(
  obj: ObjectType | any[],
  partOrParts?: PropertyKey | PropertyKey[],
  ...parts: PropertyKey[]
): unknown {
  const separator = ".";

  // If the function is called without any key or part, return the object.
  if (arguments.length < 2) {
    return obj;
  }

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
