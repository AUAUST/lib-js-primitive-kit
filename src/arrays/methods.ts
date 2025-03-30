import type { IfNever } from "type-fest";
import { ExpectedArrayError } from "~/arrays/helpers";
import type {
  ArrayKey,
  ArrayValue,
  Arrayable,
  ToArray,
  TupleToArray,
  Writable,
} from "~/arrays/types";
import { isPropertyKey } from "~/primitives/methods";

export type ToArrayFunction = {
  (input?: null | undefined): unknown[];
  <T>(length: number, mapFn?: (v: undefined, k: number) => T): T[];
  <T extends Arrayable>(arrayLike: T): ToArray<T>;
} & typeof Array.from;

export const toArray = function toArray(
  ...args: Parameters<typeof Array.from>
) {
  const arr = args[0];

  if (arr === undefined || arr === null) {
    return [];
  }

  if (isArray(arr)) {
    return arr;
  }

  if (typeof arr === "number") {
    args[0] = { length: arr };
  }

  return Array.from(...args);
} as ToArrayFunction;

export type ToCopiedArrayFunction = {
  <T extends readonly any[]>(arr: T): Writable<T>;
} & ToArrayFunction;

export const toCopiedArray = <ToCopiedArrayFunction>(
  function toCopiedArray(...args: Parameters<typeof Array.from>) {
    const arr = args[0];

    return isArray(arr)
      ? // If the input is an array, we copy it
        arr.slice()
      : // Otherwise, the `toArray` function already returns a new array (which we don't want to copy again)
        toArray(...args);
  }
);

export const isArray = Array.isArray;

export function isStrictArray(arr: any): arr is any[] {
  return isArray(arr) && arr.length > 0;
}

export function isIterable(arr: any): arr is Iterable<unknown> {
  return typeof arr?.[Symbol.iterator] === "function";
}

export function arrayEquals<T extends readonly any[]>(
  a: T,
  b: unknown,
  recursive = false
): b is Writable<T> {
  if (!isArray(a) || !isArray(b)) {
    return false;
  }

  if (Object.is(a, b)) {
    return true;
  }

  if (a.length !== b.length) {
    return false;
  }

  if (!recursive) {
    return a.every((v, i) => v === b[i]);
  }

  return a.every((v, i) => {
    const r = b[i];

    if (isArray(v)) return isArray(r) && arrayEquals(v, r, true);

    return v === r;
  });
}

export function realLength<T extends Arrayable>(arr: T): number {
  return Object.keys(toArray(arr)).length;
}

export function first<T extends Arrayable>(arr: T): ArrayValue<T> {
  const a = toArray(arr),
    k = firstKey(a);

  return k === undefined ? undefined! : a[k];
}

export function firstKey<T extends readonly any[]>(arr: T): ArrayKey<T> {
  if (!isArray(arr)) {
    throw new ExpectedArrayError();
  }
  let key: ArrayKey<T>;

  arr.some((_, k) => ((key = <any>k), true));

  return key!;
}

export function last<T extends Arrayable>(arr: T): ArrayValue<T> {
  const a = toArray(arr),
    k = lastKey(a);

  return k === undefined ? undefined! : a[k];
}

export function lastKey<T extends readonly any[]>(arr: T): ArrayKey<T> {
  if (!isArray(arr)) {
    throw new ExpectedArrayError();
  }

  for (let i = arr.length - 1; i >= 0; i--) {
    if (i in arr) {
      return <ArrayKey<T>>i;
    }
  }

  return undefined!;
}

export function toCollapsed<T extends Arrayable>(arr: T): ToArray<T> {
  return <ToArray<T>>toArray(arr).flat(0);
}

export function collapse<T extends any[]>(arr: T): T {
  if (!isArray(arr)) {
    throw new ExpectedArrayError();
  }

  const keys = Object.keys(arr); // Object.keys() returns only keys that are set, i.e. [,,1,,2] would return ["2", "4"]
  let i = 0;

  for (const key of keys) {
    arr[i++] = arr[key as keyof T];
  }

  arr.length = i;

  return arr;
}

export function toDeduplicated<T extends Arrayable>(arr: T): ToArray<T> {
  return <ToArray<T>>Array.from(new Set(toArray(arr)));
}

// https://stackoverflow.com/questions/32510114/remove-duplicates-algorithm-in-place-and-stable-javascript
export function deduplicate<T extends any[]>(arr: T): T {
  if (!isArray(arr)) {
    throw new ExpectedArrayError();
  }

  let seen = new Set(),
    k = 0;

  for (let i = 0; i < arr.length; i++) {
    const v = arr[i];

    if (!seen.has(v)) {
      arr[k++] = v;
      seen.add(v);
    }
  }

  arr.length = k;

  return arr;
}

export function hasDuplicates(arr: Arrayable): boolean {
  const a = toArray(arr);
  return new Set(a).size !== a.length;
}

export function toSorted<T extends Arrayable>(
  arr: T,
  compareFn?: (a: ArrayValue<T>, b: ArrayValue<T>) => number
): ToArray<T> {
  return <ToArray<T>>toCopiedArray(arr).sort(compareFn);
}

export function sort<T>(arr: T[], compareFn?: (a: T, b: T) => number): T[] {
  if (!isArray(arr)) {
    throw new ExpectedArrayError();
  }

  return arr.sort(compareFn);
}

export function toShuffled<T extends Arrayable>(arr: T): TupleToArray<T> {
  return <any>shuffle(toCopiedArray(arr));
}

// https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
// https://bost.ocks.org/mike/shuffle
export function shuffle<T extends any[]>(arr: T): TupleToArray<T> {
  if (!isArray(arr)) {
    throw new ExpectedArrayError();
  }

  let m = arr.length,
    t: T,
    i: number;

  while (m) {
    i = Math.floor(Math.random() * m--);
    t = arr[m]!;
    arr[m] = arr[i]!;
    arr[i] = t;
  }

  return <any>arr;
}

export function toReversed<T extends Arrayable>(arr: T): TupleToArray<T> {
  return <any>toCopiedArray(arr).reverse();
}

export function reverse<T extends any[]>(arr: T): T[keyof T & number][] {
  if (!isArray(arr)) {
    throw new ExpectedArrayError();
  }

  return arr.reverse();
}

export function random<T extends Arrayable>(arr: T): ArrayValue<T> {
  const a = toArray(arr);

  return a[Math.floor(Math.random() * a.length)];
}

export function randoms<T extends Arrayable>(
  arr: T,
  count = 1
): TupleToArray<T> {
  const a = toArray(arr),
    l = a.length;

  if (l === 0) {
    // If the array is empty, we can't return anything
    return <any>[];
  }

  if (l === 1) {
    // If the array has only one element, we return it
    return <any>[first(a)];
  }

  if (count === 1) {
    // If we only want one element, random() is more efficient than copying the array and shuffling it
    return <any>[random(arr)];
  }

  if (count >= a.length) {
    // If more elements are requested than the array has, we return a shuffled copy of the array
    return <any>toShuffled(a);
  }

  return <any>toShuffled(a).slice(0, count);
}

export function includes<T extends Arrayable>(
  arr: T,
  value: ArrayValue<T>
): boolean {
  return toArray(arr).includes(value);
}

export function difference<T extends Arrayable, U extends Arrayable>(
  arr: T,
  exclude: U
): TupleToArray<T> {
  const exclusionSet = new Set(toArray(exclude));

  return <any>toArray(arr).filter((v) => !exclusionSet.has(v));
}

export function intersection<T extends Arrayable, U extends Arrayable>(
  arr: T,
  include: U
): TupleToArray<T> {
  const intersectionSet = new Set(toArray(include));

  return <any>toArray(arr).filter((include) => intersectionSet.has(include));
}

export function wrap<T>(
  value: T
): T extends any[] ? T : IfNever<NonNullable<T>, [], T[]> {
  if (value === undefined || value === null) {
    return <any>[];
  }

  return <any>(isArray(value) ? value : [value]);
}

export function flat<T extends Arrayable, D extends number = 1>(
  arr: T,
  depth?: D
): FlatArray<T, D>[] {
  return toArray(arr).flat(depth === -1 ? Infinity : depth ?? 1);
}

export function pluck<T extends Arrayable, K extends keyof ArrayValue<T>>(
  arr: T,
  key: K
): ArrayValue<T>[K][] {
  return toArray(arr).map((v) => v[key]);
}

export function keyBy<
  T extends Record<PropertyKey, any>,
  K extends keyof T & PropertyKey
>(arr: Arrayable<T>, key: K): Record<T[K] & PropertyKey, T>;
export function keyBy(arr: Arrayable, key: PropertyKey) {
  const out = {} as Record<PropertyKey, unknown>;
  let k: PropertyKey;

  for (const v of toArray(arr)) {
    if (v && isPropertyKey((k = v[key]))) {
      out[k] = v;
    }
  }

  return out;
}
