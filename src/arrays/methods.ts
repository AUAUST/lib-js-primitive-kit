import { IfNever } from "type-fest";

export type Arrayable<T = any> =
  | Iterable<T>
  | ArrayLike<T>
  | number
  | null
  | undefined;

export type ToArray<T> = T extends string
  ? string[]
  : T extends number | null | undefined
  ? unknown[]
  : T extends ArrayLike<infer U>
  ? U[]
  : T extends Iterable<infer U>
  ? U[]
  : unknown[];

export type ArrayValue<T> = T extends Arrayable<infer U>
  ? IfNever<U, unknown, U>
  : unknown;

export type ArrayKey<T> = ToArray<T> extends infer U
  ? keyof U & number
  : undefined;

export type ToArrayFunction = typeof Array.from & {
  (input?: null | undefined): unknown[];
  <T>(length: number, mapFn?: (v: undefined, k: number) => T): T[];
  <T extends Arrayable>(arrayLike: T): ToArray<T>;
};

export const toArray = function toArray(
  ...args: Parameters<typeof Array.from>
) {
  const arr = args[0];

  if (isArray(arr)) return arr;

  if (arr === undefined || arr === null) return [];

  if (typeof arr === "number") {
    args[0] = { length: arr };
    return Array.from(...args);
  }

  return Array.from(...args);
} as ToArrayFunction;

export const toCopiedArray = function toCopiedArray(
  ...args: Parameters<typeof Array.from>
) {
  const arr = args[0];

  return isArray(arr)
    ? // If the input is an array, we copy it
      arr.slice()
    : // Otherwise, the `toArray` function already returns a new array (which we don't want to copy again)
      toArray(arr);
} as ToArrayFunction;

export function isArray(arr: any): arr is any[] {
  return Array.isArray(arr);
}

export function isStrictArray(arr: any): arr is any[] {
  return isArray(arr) && arr.length > 0;
}

export function isIterable(arr: any): arr is Iterable<unknown> {
  return !!arr && typeof arr[Symbol.iterator] === "function";
}

export function arrayEquals<T extends any[]>(
  a: T,
  b: any[],
  recursive = false
): b is T {
  if (Object.is(a, b)) return true;
  if (a.length !== b.length) return false;
  a = toArray(a) as any;
  b = toArray(b);
  if (!recursive) return a.every((v, i) => v === b[i]);
  return a.every((v, i) => {
    if (Array.isArray(v) && Array.isArray(b[i])) {
      return arrayEquals(v, b[i], true);
    }
    return v === b[i];
  });
}

export function realLength<T extends Arrayable>(arr: T): number {
  return Object.keys(toArray(arr)).length;
}

export function first<T extends Arrayable>(arr: T): ArrayValue<T> {
  const a = toArray(arr);
  return a[firstKey(a)] as any;
}

export function firstKey<T extends Arrayable>(
  arr: T
): keyof ToArray<T> & number {
  let a = toArray(arr),
    key;

  a.some((_, k) => ((key = k), true));

  return key as any;
}

export function toCollapsed<T extends Arrayable>(arr: T): ToArray<T> {
  return toArray(arr).flat(0) as any;
}

export function collapse<T extends any[]>(arr: T): T {
  if (!isArray(arr)) throw new TypeError("Expected an array");

  const keys = Object.keys(arr); // Object.keys() returns only keys that are set, i.e. [,,1,,2] would return ["2", "4"]
  let i = 0;

  for (const key of keys) {
    arr[i++] = arr[key as keyof T];
  }

  arr.length = i;

  return arr;
}

export function toDeduplicated<T extends Arrayable>(arr: T): ToArray<T> {
  return Array.from(new Set(toArray(arr))) as any;
}

// https://stackoverflow.com/questions/32510114/remove-duplicates-algorithm-in-place-and-stable-javascript
export function deduplicate<T extends any[]>(arr: T): T {
  if (!isArray(arr)) throw new TypeError("Expected an array");

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
  return toCopiedArray(arr).sort(compareFn) as any;
}

export function sort<T>(arr: T[], compareFn?: (a: T, b: T) => number): T[] {
  if (!isArray(arr)) throw new TypeError("Expected an array");

  return arr.sort(compareFn);
}

export function toShuffled<T>(arr: T[]): T[] {
  return shuffle(toCopiedArray(arr));
}

// https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
// https://bost.ocks.org/mike/shuffle
export function shuffle<T>(arr: T[]): T[] {
  if (!isArray(arr)) throw new TypeError("Expected an array");

  let m = arr.length,
    t: T,
    i: number;

  while (m) {
    i = Math.floor(Math.random() * m--);
    t = arr[m]!;
    arr[m] = arr[i]!;
    arr[i] = t;
  }

  return arr;
}

export function random<T extends Arrayable>(arr: T): ArrayValue<T> {
  const a = toArray(arr);

  return a[Math.floor(Math.random() * a.length)];
}

export function randoms<T extends Arrayable>(
  arr: T,
  count = 1
): ArrayValue<T>[] {
  const a = toArray(arr),
    l = a.length;

  if (l === 0) return []; // If the array is empty, we can't return anything
  if (l === 1) return [a[firstKey(a)]]; // If the array has only one element, we return it
  if (count === 1) return [random(arr)]; // If we only want one element, random() is more efficient than copying the array and shuffling it
  if (count >= a.length) return toShuffled(a) as any;
  return toShuffled(a).slice(0, count) as any;
}
