export type ToArrayFunction = typeof Array.from & {
  (input?: null | undefined): unknown[];
  <U>(length: number, mapFn?: (v: undefined, k: number) => U): U[];
};

export const toArray = function toArray(
  ...args: Parameters<typeof Array.from>
) {
  const first = args[0];

  if (first === undefined || first === null) {
    return [];
  }

  if (typeof first === "number") {
    args[0] = { length: first };
    return Array.from(...args);
  }

  return Array.from(...args);
} as ToArrayFunction;

export function isArray(arr: any): arr is any[] {
  return Array.isArray(arr);
}

export function isStrictArray(arr: any): arr is any[] {
  return isArray(arr) && arr.length > 0;
}

export function isIterable(arr: any): arr is Iterable<unknown> {
  return typeof arr?.[Symbol.iterator] === "function";
}

export function arrayEquals<T extends any[]>(
  a: T,
  b: any[],
  recursive = false
): b is T {
  if (Object.is(a, b)) return true;
  if (a.length !== b.length) return false;
  if (!recursive) return a.every((v, i) => v === b[i]);
  return a.every((v, i) => {
    if (Array.isArray(v) && Array.isArray(b[i])) {
      return arrayEquals(v, b[i], true);
    }
    return v === b[i];
  });
}

export function realLength<T extends any[]>(arr: T): number {
  return Object.keys(arr).length;
}

export function first<T>(arr: T[]): T | undefined {
  let value;

  // we use `some` because:
  // - we can stop the iteration as soon as we find a value
  // - it automatically skips empty keys where looping with a for loop would not
  arr.some((v) => v !== undefined && ((value = v), true));

  return value;
}

export function firstKey<T>(arr: T[]): number | undefined {
  let key;

  arr.some((_, k) => ((key = k), true));

  return key;
}

export function toCollapsed<T>(arr: T[]): T[] {
  return arr.flat(0);
}

export function collapse<T extends any[]>(arr: T): T {
  const keys = Object.keys(arr); // Object.keys() returns only keys that are set, i.e. [,,1,,2] would return ["2", "4"]
  let i = 0;

  for (const key of keys) {
    arr[i++] = arr[key as keyof T];
  }

  arr.length = i;

  return arr;
}

export function toDeduplicated<T>(arr: T[]): T[] {
  return Array.from(new Set(arr));
}

// https://stackoverflow.com/questions/32510114/remove-duplicates-algorithm-in-place-and-stable-javascript
export function deduplicate<T extends any[]>(arr: T): T {
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

export function hasDuplicates<T>(arr: T[]): boolean {
  return new Set(arr).size !== arr.length;
}

export function toSorted<T>(arr: T[], compareFn?: (a: T, b: T) => number): T[] {
  return arr.slice().sort(compareFn);
}

export function sort<T>(arr: T[], compareFn?: (a: T, b: T) => number): T[] {
  return arr.sort(compareFn);
}

export function toShuffled<T>(arr: T[]): T[] {
  return shuffle(arr.slice());
}

// https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
// https://bost.ocks.org/mike/shuffle
export function shuffle<T>(arr: T[]): T[] {
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

export function random<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)]!;
}

export function randoms<T>(arr: T[], n = 1): T[] {
  const l = arr.length;

  if (l === 0) return [];
  if (l === 1) return [arr[firstKey(arr)!]!];
  if (n === 1) return [random(arr)];
  if (n >= arr.length) return toShuffled(arr);
  return toShuffled(arr).slice(0, n);
}
