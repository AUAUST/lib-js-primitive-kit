// This file is generated. Do not edit it directly.

import type { Writable, WritableRecursive } from "./../objects/types";
import type { Concatenated, Stringifiable } from "./../strings/index";
import type { IfNever } from "./../utils/types";
import type { MethodArguments, MethodNames, Methods } from "./methods/map";
import type { ToArray } from "./methods/toArray";
import type { Arrayable, ArrayValue } from "./types";

import { at } from "./methods/at";
import { collapse } from "./methods/collapse";
import { concat } from "./methods/concat";
import { deduplicate } from "./methods/deduplicate";
import { difference } from "./methods/difference";
import { entries } from "./methods/entries";
import { equals } from "./methods/equals";
import { every } from "./methods/every";
import { fill } from "./methods/fill";
import { filter } from "./methods/filter";
import { find } from "./methods/find";
import { findIndex } from "./methods/findIndex";
import { findLast } from "./methods/findLast";
import { findLastIndex } from "./methods/findLastIndex";
import { first } from "./methods/first";
import { firstKey } from "./methods/firstKey";
import { flat } from "./methods/flat";
import { flatMap } from "./methods/flatMap";
import { forEach } from "./methods/forEach";
import { fromAsync } from "./methods/fromAsync";
import { hasDuplicates } from "./methods/hasDuplicates";
import { includes } from "./methods/includes";
import { indexOf } from "./methods/indexOf";
import { intersection } from "./methods/intersection";
import { isArray } from "./methods/isArray";
import { isIterable } from "./methods/isIterable";
import { isNotArray } from "./methods/isNotArray";
import { isNotEmpty } from "./methods/isNotEmpty";
import { join } from "./methods/join";
import { keyBy } from "./methods/keyBy";
import { keys } from "./methods/keys";
import { last } from "./methods/last";
import { lastIndexOf } from "./methods/lastIndexOf";
import { lastKey } from "./methods/lastKey";
import { map } from "./methods/map";
import { pluck } from "./methods/pluck";
import { pull } from "./methods/pull";
import { random } from "./methods/random";
import { randoms } from "./methods/randoms";
import { realLength } from "./methods/realLength";
import { reverse } from "./methods/reverse";
import { shuffle } from "./methods/shuffle";
import { sort } from "./methods/sort";
import { toArray } from "./methods/toArray";
import { toCollapsed } from "./methods/toCollapsed";
import { toCopiedArray } from "./methods/toCopiedArray";
import { toDeduplicated } from "./methods/toDeduplicated";
import { toReversed } from "./methods/toReversed";
import { toShuffled } from "./methods/toShuffled";
import { toSorted } from "./methods/toSorted";
import { withIndex } from "./methods/withIndex";
import { wrap } from "./methods/wrap";

class A<
  const Input extends Arrayable,
  Value extends any[] = ToArray<Input>,
> {
  readonly value: Value;

  constructor(value: Input) {
    this.value = toArray(value) as ToArray<Input> & Value;
  }

  static make<Input extends Arrayable>(value: Input) {
    return new this(value);
  }

  get length(): number {
    return this.value.length;
  }

  valueOf(): Value {
    return this.value;
  }

  [Symbol.iterator]() {
    return this.value[Symbol.iterator]();
  }

  at(index: number): ArrayValue<Value>;
  at(...args: any[]): any {
    // @ts-ignore
    return at(this.valueOf(), ...args);
  }

  /**
   * Collapse the array in place.
   *
   * @example ```ts
   * A.collapse([,,,1,,,2,3]) // [1,2,3]
   * ```
   */
  collapse(): A<Value>;
  collapse(...args: any[]): any {
    // @ts-ignore
    return new A(collapse(this.valueOf(), ...args));
  }

  concat<const U>(...items: ConcatArray<U>[]): A<(ArrayValue<Value> | U)[]>;
  concat<const U>(...items: (U | ConcatArray<U>)[]): A<(ArrayValue<Value> | U)[]>;
  concat(...args: any[]): any {
    // @ts-ignore
    return new A(concat(this.valueOf(), ...args));
  }

  /**
   * Removes duplicate values from the array in place.
   *
   * @see https://stackoverflow.com/questions/32510114/remove-duplicates-algorithm-in-place-and-stable-javascript
   */
  deduplicate(): A<Value>;
  deduplicate(...args: any[]): any {
    // @ts-ignore
    return new A(deduplicate(this.valueOf(), ...args));
  }

  /**
   * Returns the values of first array that are not present in the second array.
   */
  difference<T, U>(exclude: Arrayable<U>): T[];
  difference(...args: any[]): any {
    // @ts-ignore
    return difference(this.valueOf(), ...args);
  }

  entries(): A<ArrayIterator<[number, ArrayValue<Value>]>>;
  entries(...args: any[]): any {
    // @ts-ignore
    return new A(entries(this.valueOf(), ...args));
  }

  /**
   * Compare two arrays for equality.
   * If `recursive` is true, nested arrays will be compared as well.
   * Non-array objects are compared using `Object.is()`.
   */
  equals(b: unknown, recursive?: boolean): b is WritableRecursive<Value>;
  equals(...args: any[]): any {
    // @ts-ignore
    return equals(this.valueOf(), ...args);
  }

  every<S extends ArrayValue<Value>>(predicate: (
    value: ArrayValue<Value>,
    index: number,
    array: ToArray<Value>,
  ) => value is S, thisArg?: any): this is S[];
  every(predicate: (
    value: ArrayValue<Value>,
    index: number,
    array: ToArray<Value>,
  ) => unknown, thisArg?: any): boolean;
  every(predicate: keyof ArrayValue<Value>, thisArg?: any): boolean;
  every(...args: any[]): any {
    // @ts-ignore
    return every(this.valueOf(), ...args);
  }

  fill(value: ArrayValue<Value>, start?: number, end?: number): A<ToArray<Value>>;
  fill(...args: any[]): any {
    // @ts-ignore
    return new A(fill(this.valueOf(), ...args));
  }

  filter<S extends ArrayValue<Value>>(predicate: (
    value: ArrayValue<Value>,
    index: number,
    array: ToArray<Value>,
  ) => value is S, thisArg?: any): A<S[]>;
  filter(predicate: (
    value: ArrayValue<Value>,
    index: number,
    array: ToArray<Value>,
  ) => unknown, thisArg?: any): A<Value[]>;
  filter(predicate: keyof ArrayValue<Value>, thisArg?: any): A<ToArray<Value>>;
  filter(...args: any[]): any {
    // @ts-ignore
    return new A(filter(this.valueOf(), ...args));
  }

  find<S extends ArrayValue<Value>>(predicate: (
    value: ArrayValue<Value>,
    index: number,
    array: ToArray<Value>,
  ) => value is S, thisArg?: any): S | undefined;
  find(predicate: (
    value: ArrayValue<Value>,
    index: number,
    array: ToArray<Value>,
  ) => unknown, thisArg?: any): ArrayValue<Value> | undefined;
  find(predicate: keyof ArrayValue<Value>, thisArg?: any): ArrayValue<Value> | undefined;
  find(...args: any[]): any {
    // @ts-ignore
    return find(this.valueOf(), ...args);
  }

  findIndex(predicate: (
    value: ArrayValue<Value>,
    index: number,
    array: ToArray<Value>,
  ) => unknown, thisArg?: any): number;
  findIndex(predicate: keyof ArrayValue<Value>, thisArg?: any): number;
  findIndex(...args: any[]): any {
    // @ts-ignore
    return findIndex(this.valueOf(), ...args);
  }

  findLast<S extends ArrayValue<Value>>(predicate: (
    value: ArrayValue<Value>,
    index: number,
    array: ToArray<Value>,
  ) => value is S, thisArg?: any): S | undefined;
  findLast(predicate: (
    value: ArrayValue<Value>,
    index: number,
    array: ToArray<Value>,
  ) => unknown, thisArg?: any): ArrayValue<Value> | undefined;
  findLast(predicate: keyof ArrayValue<Value>, thisArg?: any): ArrayValue<Value> | undefined;
  findLast(...args: any[]): any {
    // @ts-ignore
    return findLast(this.valueOf(), ...args);
  }

  findLastIndex(predicate: (
    value: ArrayValue<Value>,
    index: number,
    array: ToArray<Value>,
  ) => unknown, thisArg?: any): number;
  findLastIndex(predicate: keyof ArrayValue<Value>, thisArg?: any): number;
  findLastIndex(...args: any[]): any {
    // @ts-ignore
    return findLastIndex(this.valueOf(), ...args);
  }

  /**
   * Returns the first value of the array that is not `undefined`, and that is not an empty key.
   *
   * @example ```ts
   * A.firstValue([1,2,3]) // 1
   * A.firstValue([,,,1,,,2,3]) // 1
   * ```
   */
  first(): ArrayValue<Value>;
  first(...args: any[]): any {
    // @ts-ignore
    return first(this.valueOf(), ...args);
  }

  /**
   * Returns the first existing key in the array.
   *
   * @example ```ts
   * A.firstKey([1,2,3]) // 0
   * A.firstKey([,,,1,,,2,3]) // 3
   * ```
   */
  firstKey(): number | undefined;
  firstKey(): number;
  firstKey(...args: any[]): any {
    // @ts-ignore
    return firstKey(this.valueOf(), ...args);
  }

  /**
   * Returns a new array with all sub-array elements concatenated into it recursively up to the specified depth.
   */
  flat<D extends number = 1>(depth?: D): FlatArray<Value, D>[];
  flat(...args: any[]): any {
    // @ts-ignore
    return flat(this.valueOf(), ...args);
  }

  flatMap<U, This = undefined>(callback: (
    this: This,
    value: ArrayValue<Value>,
    index: number,
    array: ToArray<Value>,
  ) => U | ReadonlyArray<U>, thisArg?: This): A<U[]>;
  flatMap(...args: any[]): any {
    // @ts-ignore
    return new A(flatMap(this.valueOf(), ...args));
  }

  forEach(callbackfn: (value: ArrayValue<Value>, index: number, array: ToArray<Value>) => void, thisArg?: any): A<ToArray<Value>>;
  forEach(...args: any[]): any {
    // @ts-ignore
    return new A(forEach(this.valueOf(), ...args));
  }

  /**
   * Returns a boolean whether the array has duplicate values.
   */
  hasDuplicates(): boolean;
  hasDuplicates(...args: any[]): any {
    // @ts-ignore
    return hasDuplicates(this.valueOf(), ...args);
  }

  /**
   * Returns whether the array contains the given value.
   */
  includes(value: ArrayValue<Value>): boolean;
  includes(...args: any[]): any {
    // @ts-ignore
    return includes(this.valueOf(), ...args);
  }

  /** @alias A.includes */
  contains = this.includes;

  indexOf(searchElement: ArrayValue<Value>, fromIndex?: number): number;
  indexOf(...args: any[]): any {
    // @ts-ignore
    return indexOf(this.valueOf(), ...args);
  }

  /**
   * Returns the values of the first array that are also present in the second array.
   */
  intersection<T>(include: Arrayable<T>): T[];
  intersection(...args: any[]): any {
    // @ts-ignore
    return intersection(this.valueOf(), ...args);
  }

  /**
   * Shorthand for `Array.isArray()`, but also checks if the array has a length greater than 0.
   */
  isNotEmpty(): this is any[];
  isNotEmpty(...args: any[]): any {
    // @ts-ignore
    return isNotEmpty(this.valueOf(), ...args);
  }

  /** @alias A.isNotEmpty */
  isStrict = this.isNotEmpty;

  join<S extends Stringifiable>(separator?: S): Concatenated<ToArray<Value>, S>;
  join(...args: any[]): any {
    // @ts-ignore
    return join(this.valueOf(), ...args);
  }

  /**
   * Converts an array of objects into an object keyed by a specified property.
   */
  keyBy<K extends keyof ArrayValue<Value>>(key: IfNever<K, PropertyKey, K>): Value extends Arrayable<infer U>
  ? {
      [P in ArrayValue<Value> as K extends keyof P & PropertyKey ? P[K] : never]: P;
    }
  : never;
  keyBy(...args: any[]): any {
    // @ts-ignore
    return keyBy(this.valueOf(), ...args);
  }

  keys(): A<ArrayIterator<number>>;
  keys(...args: any[]): any {
    // @ts-ignore
    return new A(keys(this.valueOf(), ...args));
  }

  /**
   * Returns the last value of the array.
   *
   * @example ```ts
   * A.lastValue([1,2,3]) // 3
   * A.lastValue([,,,1,,,2,3]) // 3
   * ```
   */
  last(): ArrayValue<Value>;
  last(...args: any[]): any {
    // @ts-ignore
    return last(this.valueOf(), ...args);
  }

  lastIndexOf(searchElement: ArrayValue<Value>, fromIndex?: number): number;
  lastIndexOf(...args: any[]): any {
    // @ts-ignore
    return lastIndexOf(this.valueOf(), ...args);
  }

  /**
   * Returns the last key in the array.
   *
   * @example ```ts
   * A.lastKey([1,2,3]) // 2
   * A.lastKey([,,,1,,,2,3]) // 7
   * ```
   */
  lastKey(): number | undefined;
  lastKey(): number;
  lastKey(...args: any[]): any {
    // @ts-ignore
    return lastKey(this.valueOf(), ...args);
  }

  map<U>(callbackfn: (value: ArrayValue<Value>, index: number, array: ToArray<Value>) => U): A<U[]>;
  map<K extends MethodNames<ArrayValue<Value>>>(method: K, ...args: MethodArguments<ArrayValue<Value>, K>): A<ReturnType<Methods<ArrayValue<Value>, K>>[]>;
  map(...args: any[]): any {
    // @ts-ignore
    return new A(map(this.valueOf(), ...args));
  }

  /**
   * Plucks the selected key from each entry in the array.
   */
  pluck<K extends keyof ArrayValue<Value>>(key: K): ArrayValue<Value>[K][];
  pluck(...args: any[]): any {
    // @ts-ignore
    return pluck(this.valueOf(), ...args);
  }

  /**
   * Removes the specified values from the array.
   * If a single value is passed, all occurrences of that value are removed and the count of removed values is returned.
   * If an array of values is passed, the values contained in the array are removed from the original array
   * and a new array is returned containing the removed values.
   * If a callback is passed, the callback is called for each value in the array.
   * If the callback returns true, the value is removed from the original array and included in the new array that is returned.
   */
  pull<T>(value: T): number;
  pull<T>(values: T[]): T[];
  pull<T>(predicate: (value: T) => boolean): T[];
  pull(...args: any[]): any {
    // @ts-ignore
    return pull(this.valueOf(), ...args);
  }

  /**
   * Picks a random element from the array.
   */
  random(): ArrayValue<Value>;
  random(...args: any[]): any {
    // @ts-ignore
    return random(this.valueOf(), ...args);
  }

  /**
   * Picks a set of random elements from the array, up to the array's length.
   */
  randoms<T>(count?: number): T[];
  randoms(...args: any[]): any {
    // @ts-ignore
    return randoms(this.valueOf(), ...args);
  }

  /**
   * Returns the length of an array without counting empty keys.
   *
   * @example ```ts
   * A.realLength([1,2,3,4]) // 4
   * A.realLength([,,,1,,,2,3]) // 3
   * ```
   */
  realLength(): number;
  realLength(...args: any[]): any {
    // @ts-ignore
    return realLength(this.valueOf(), ...args);
  }

  /**
   * Reverses the array in place.
   */
  reverse(): A<Value[keyof Value & number][]>;
  reverse(...args: any[]): any {
    // @ts-ignore
    return new A(reverse(this.valueOf(), ...args));
  }

  /**
   * Shuffles an array in place.
   *
   * @see https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
   * @see https://bost.ocks.org/mike/shuffle
   */
  shuffle<T>(): A<T[]>;
  shuffle(...args: any[]): any {
    // @ts-ignore
    return new A(shuffle(this.valueOf(), ...args));
  }

  /**
   * Sorts an array in place.
   */
  sort<T>(compareFn?: (a: T, b: T) => number): A<T[]>;
  sort(...args: any[]): any {
    // @ts-ignore
    return new A(sort(this.valueOf(), ...args));
  }

  /**
   * Returns a new array where empty keys have been removed.
   *
   * @example ```ts
   * A.toCollapsed([,,,1,,,2,3]) // [1,2,3]
   * ```
   */
  toCollapsed(): ToArray<Value, false>;
  toCollapsed(...args: any[]): any {
    // @ts-ignore
    return toCollapsed(this.valueOf(), ...args);
  }

  /**
   * Returns a new array with the same values as the original.
   * Non-array iterables are converted to arrays. Arrays are shallow-copied.
   */
  toCopiedArray(): unknown[];
  toCopiedArray<T>(mapFn?: (v: undefined, k: number) => T): T[];
  toCopiedArray(): Writable<Value>;
  toCopiedArray(): ToArray<Value>;
  toCopiedArray(mapFn: (v: undefined, k: number) => unknown): unknown[];
  toCopiedArray(...args: any[]): any {
    // @ts-ignore
    return toCopiedArray(this.valueOf(), ...args);
  }

  /** @alias A.toCopiedArray */
  copy = this.toCopiedArray;

  /**
   * Returns a new array where duplicate values have been removed.
   */
  toDeduplicated(): ToArray<Value>;
  toDeduplicated(...args: any[]): any {
    // @ts-ignore
    return toDeduplicated(this.valueOf(), ...args);
  }

  /**
   * Returns a copy of the array where the values are reversed.
   */
  toReversed<T>(): T[];
  toReversed(...args: any[]): any {
    // @ts-ignore
    return toReversed(this.valueOf(), ...args);
  }

  /**
   * Returns a copy of the array shuffled.
   */
  toShuffled<T>(): T[];
  toShuffled(...args: any[]): any {
    // @ts-ignore
    return toShuffled(this.valueOf(), ...args);
  }

  /**
   * Returns a copy of the array sorted.
   */
  toSorted(compareFn?: (a: ArrayValue<Value>, b: ArrayValue<Value>) => number): ToArray<Value, false>;
  toSorted(...args: any[]): any {
    // @ts-ignore
    return toSorted(this.valueOf(), ...args);
  }

  withIndex(index: number, value: ArrayValue<Value>): ToArray<Value, false>;
  withIndex<const V>(index: number, value: V): (ArrayValue<Value> | V)[];
  withIndex(...args: any[]): any {
    // @ts-ignore
    return withIndex(this.valueOf(), ...args);
  }

  /** @alias A.withIndex */
  with = this.withIndex;
}

const AWithMethods = Object.assign(A, {
  at,
  /**
   * Collapse the array in place.
   *
   * @example ```ts
   * A.collapse([,,,1,,,2,3]) // [1,2,3]
   * ```
   */
  collapse,
  concat,
  /**
   * Removes duplicate values from the array in place.
   *
   * @see https://stackoverflow.com/questions/32510114/remove-duplicates-algorithm-in-place-and-stable-javascript
   */
  deduplicate,
  /**
   * Returns the values of first array that are not present in the second array.
   */
  difference,
  entries,
  /**
   * Compare two arrays for equality.
   * If `recursive` is true, nested arrays will be compared as well.
   * Non-array objects are compared using `Object.is()`.
   */
  equals,
  every,
  fill,
  filter,
  find,
  findIndex,
  findLast,
  findLastIndex,
  /**
   * Returns the first value of the array that is not `undefined`, and that is not an empty key.
   *
   * @example ```ts
   * A.firstValue([1,2,3]) // 1
   * A.firstValue([,,,1,,,2,3]) // 1
   * ```
   */
  first,
  /**
   * Returns the first existing key in the array.
   *
   * @example ```ts
   * A.firstKey([1,2,3]) // 0
   * A.firstKey([,,,1,,,2,3]) // 3
   * ```
   */
  firstKey,
  /**
   * Returns a new array with all sub-array elements concatenated into it recursively up to the specified depth.
   */
  flat,
  flatMap,
  forEach,
  fromAsync,
  /**
   * Returns a boolean whether the array has duplicate values.
   */
  hasDuplicates,
  /**
   * Returns whether the array contains the given value.
   */
  includes,
  /** @alias A.includes */
  contains: includes,
  indexOf,
  /**
   * Returns the values of the first array that are also present in the second array.
   */
  intersection,
  /**
   * Shorthand for `Array.isArray()`.
   */
  isArray,
  /** @alias A.isArray */
  is: isArray,
  /**
   * Returns a boolean whether the given input is iterable.
   */
  isIterable,
  /**
   * Shorthand for `!Array.isArray()`.
   */
  isNotArray,
  /**
   * Shorthand for `Array.isArray()`, but also checks if the array has a length greater than 0.
   */
  isNotEmpty,
  /** @alias A.isNotEmpty */
  isStrict: isNotEmpty,
  join,
  /**
   * Converts an array of objects into an object keyed by a specified property.
   */
  keyBy,
  keys,
  /**
   * Returns the last value of the array.
   *
   * @example ```ts
   * A.lastValue([1,2,3]) // 3
   * A.lastValue([,,,1,,,2,3]) // 3
   * ```
   */
  last,
  lastIndexOf,
  /**
   * Returns the last key in the array.
   *
   * @example ```ts
   * A.lastKey([1,2,3]) // 2
   * A.lastKey([,,,1,,,2,3]) // 7
   * ```
   */
  lastKey,
  map,
  /**
   * Plucks the selected key from each entry in the array.
   */
  pluck,
  /**
   * Removes the specified values from the array.
   * If a single value is passed, all occurrences of that value are removed and the count of removed values is returned.
   * If an array of values is passed, the values contained in the array are removed from the original array
   * and a new array is returned containing the removed values.
   * If a callback is passed, the callback is called for each value in the array.
   * If the callback returns true, the value is removed from the original array and included in the new array that is returned.
   */
  pull,
  /**
   * Picks a random element from the array.
   */
  random,
  /**
   * Picks a set of random elements from the array, up to the array's length.
   */
  randoms,
  /**
   * Returns the length of an array without counting empty keys.
   *
   * @example ```ts
   * A.realLength([1,2,3,4]) // 4
   * A.realLength([,,,1,,,2,3]) // 3
   * ```
   */
  realLength,
  /**
   * Reverses the array in place.
   */
  reverse,
  /**
   * Shuffles an array in place.
   *
   * @see https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
   * @see https://bost.ocks.org/mike/shuffle
   */
  shuffle,
  /**
   * Sorts an array in place.
   */
  sort,
  /**
   * Converts any value to an array.
   * `null` and `undefined` are converted to empty arrays.
   * Numbers are used to create arrays of a specific length.
   * Everything else uses the native `Array.from()`.
   */
  toArray,
  /** @alias A.toArray */
  from: toArray,
  /**
   * Returns a new array where empty keys have been removed.
   *
   * @example ```ts
   * A.toCollapsed([,,,1,,,2,3]) // [1,2,3]
   * ```
   */
  toCollapsed,
  /**
   * Returns a new array with the same values as the original.
   * Non-array iterables are converted to arrays. Arrays are shallow-copied.
   */
  toCopiedArray,
  /** @alias A.toCopiedArray */
  copy: toCopiedArray,
  /**
   * Returns a new array where duplicate values have been removed.
   */
  toDeduplicated,
  /**
   * Returns a copy of the array where the values are reversed.
   */
  toReversed,
  /**
   * Returns a copy of the array shuffled.
   */
  toShuffled,
  /**
   * Returns a copy of the array sorted.
   */
  toSorted,
  withIndex,
  /** @alias A.withIndex */
  with: withIndex,
  /**
   * Wraps the passed value in an array. If the value is nullish, an empty array is returned. If the value is already an array, it is returned as is.
   */
  wrap,
});

export type AInstance<Input extends Arrayable = Arrayable, Value extends any[] = ToArray<Input>> = A<Input, Value>

function a<const Input extends Arrayable>(value: Input): A<Input> {
  return new A(value);
}

const WrappedA = new Proxy(AWithMethods as typeof AWithMethods & typeof toArray, {
  apply(_target, _thisArgument, argumentsList) {
    return toArray(...argumentsList);
  },
});

export { WrappedA as A, a };

export type { MethodArguments, MethodNames, Methods } from "./methods/map";
export type { ToArray } from "./methods/toArray";
export type { Arrayable, ArrayValue, IfUncertain } from "./types";
