// This file is generated. Do not edit it directly.

import type { Writable, WritableRecursive } from "./../objects/types";
import type { IfNever } from "./../shared/types";
import type { Concatenated, Stringifiable } from "./../strings/index";
import type { Callback, PropertyNames, PropertyValue } from "./methods/filterMap";
import type { MethodArguments, MethodNames, Methods } from "./methods/map";
import type { MappedValue, MapWithKeysResult } from "./methods/mapWithKeys";
import type { ToArray } from "./methods/toArray";
import type { Arrayable, ArrayValue } from "./types";

import { assignMethods } from "../shared/assignMethods";
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
import { filterMap } from "./methods/filterMap";
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
import { isSorted } from "./methods/isSorted";
import { join } from "./methods/join";
import { keyBy } from "./methods/keyBy";
import { keys } from "./methods/keys";
import { last } from "./methods/last";
import { lastIndexOf } from "./methods/lastIndexOf";
import { lastKey } from "./methods/lastKey";
import { map } from "./methods/map";
import { mapWithKeys } from "./methods/mapWithKeys";
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

  toArray(): Value {
    return this.value;
  }

  [Symbol.iterator]() {
    return this.value[Symbol.iterator]();
  }
}

interface A<Input extends Arrayable, Value extends any[] = ToArray<Input>> {
  at(index: number): ArrayValue<Value>;

  /**
   * Collapse the array in place.
   *
   * @example ```ts
   * A.collapse([,,,1,,,2,3]) // [1,2,3]
   * ```
   */
  collapse(): A<Value>;

  concat<const U>(...items: ConcatArray<U>[]): A<(ArrayValue<Value> | U)[]>;
  concat<const U>(...items: (U | ConcatArray<U>)[]): A<(ArrayValue<Value> | U)[]>;

  /**
   * Removes duplicate values from the array in place.
   *
   * @see https://stackoverflow.com/questions/32510114/remove-duplicates-algorithm-in-place-and-stable-javascript
   */
  deduplicate(): A<Value>;

  /**
   * Returns the values of first array that are not present in the second array.
   */
  difference<T, U>(exclude: Arrayable<U>): T[];

  entries(): A<ArrayIterator<[number, ArrayValue<Value>]>>;

  /**
   * Compare two arrays for equality.
   * If `recursive` is true, nested arrays will be compared as well.
   * Non-array objects are compared using `Object.is()`.
   */
  equals(b: unknown, recursive?: boolean): b is WritableRecursive<Value>;

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

  fill(value: ArrayValue<Value>, start?: number, end?: number): A<ToArray<Value>>;

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

  /**
   * Maps the values returned by a filter-mapper and excludes `undefined` results.
   * Alternatively, accepts a separate filter and mapper. Property keys can be
   * used in place of callbacks to read the corresponding value from each item.
   */
  filterMap<Result>(callback: Callback<Value, Result>): A<Exclude<Result, undefined>[]>;
  filterMap<Key extends PropertyNames<ArrayValue<Value>>>(property: Key): A<Exclude<PropertyValue<ArrayValue<Value>, Key>, undefined>[]>;
  filterMap<U extends ArrayValue<Value>, Result>(filter: (
    value: ArrayValue<Value>,
    index: number,
    array: ToArray<Value>,
  ) => value is U, map: (value: U, index: number, array: ToArray<Value>) => Result): A<Result[]>;
  filterMap<U extends ArrayValue<Value>, Key extends PropertyNames<U>>(filter: (
    value: ArrayValue<Value>,
    index: number,
    array: ToArray<Value>,
  ) => value is U, property: Key): A<PropertyValue<U, Key>[]>;
  filterMap<Result>(filter: Callback<Value, unknown>, map: Callback<Value, Result>): A<Result[]>;
  filterMap<Key extends PropertyNames<ArrayValue<Value>>>(filter: Callback<Value, unknown>, property: Key): A<PropertyValue<ArrayValue<Value>, Key>[]>;
  filterMap<FilterKey extends PropertyNames<ArrayValue<Value>>, Result>(filterProperty: FilterKey, map: Callback<Value, Result>): A<Result[]>;
  filterMap<FilterKey extends PropertyNames<ArrayValue<Value>>, MapKey extends PropertyNames<ArrayValue<Value>>>(filterProperty: FilterKey, mapProperty: MapKey): A<PropertyValue<ArrayValue<Value>, MapKey>[]>;

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

  findIndex(predicate: (
    value: ArrayValue<Value>,
    index: number,
    array: ToArray<Value>,
  ) => unknown, thisArg?: any): number;
  findIndex(predicate: keyof ArrayValue<Value>, thisArg?: any): number;

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

  findLastIndex(predicate: (
    value: ArrayValue<Value>,
    index: number,
    array: ToArray<Value>,
  ) => unknown, thisArg?: any): number;
  findLastIndex(predicate: keyof ArrayValue<Value>, thisArg?: any): number;

  /**
   * Returns the first value of the array that is not `undefined`, and that is not an empty key.
   *
   * @example ```ts
   * A.firstValue([1,2,3]) // 1
   * A.firstValue([,,,1,,,2,3]) // 1
   * ```
   */
  first(): ArrayValue<Value>;

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

  /**
   * Returns a new array with all sub-array elements concatenated into it recursively up to the specified depth.
   */
  flat<D extends number = 1>(depth?: D): FlatArray<Value, D>[];

  flatMap<U, This = undefined>(callback: (
    this: This,
    value: ArrayValue<Value>,
    index: number,
    array: ToArray<Value>,
  ) => U | ReadonlyArray<U>, thisArg?: This): A<U[]>;

  forEach(callbackfn: (value: ArrayValue<Value>, index: number, array: ToArray<Value>) => void, thisArg?: any): A<ToArray<Value>>;

  /**
   * Returns a boolean whether the array has duplicate values.
   */
  hasDuplicates(): boolean;

  /**
   * Returns whether the array contains the given value.
   */
  includes(value: ArrayValue<Value>): boolean;

  /** @alias A.includes */
  contains(value: ArrayValue<Value>): boolean;

  indexOf(searchElement: ArrayValue<Value>, fromIndex?: number): number;

  /**
   * Returns the values of the first array that are also present in the second array.
   */
  intersection<T>(include: Arrayable<T>): T[];

  /**
   * Shorthand for `Array.isArray()`, but also checks if the array has a length greater than 0.
   */
  isNotEmpty(): this is any[];

  /** @alias A.isNotEmpty */
  isStrict(): this is any[];

  isSorted(compareFn?: (a: ArrayValue<Value>, b: ArrayValue<Value>) => number): boolean;

  join<S extends Stringifiable>(separator?: S): Concatenated<ToArray<Value>, S>;

  /**
   * Converts an array of objects into an object keyed by a specified property.
   */
  keyBy<K extends keyof ArrayValue<Value>>(key: IfNever<K, PropertyKey, K>): Value extends Arrayable<infer U>
  ? {
      [P in ArrayValue<Value> as K extends keyof P & PropertyKey ? P[K] : never]: P;
    }
  : never;

  keys(): A<ArrayIterator<number>>;

  /**
   * Returns the last value of the array.
   *
   * @example ```ts
   * A.lastValue([1,2,3]) // 3
   * A.lastValue([,,,1,,,2,3]) // 3
   * ```
   */
  last(): ArrayValue<Value>;

  lastIndexOf(searchElement: ArrayValue<Value>, fromIndex?: number): number;

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

  map<U>(callbackfn: (value: ArrayValue<Value>, index: number, array: ToArray<Value>) => U): A<U[]>;
  map<K extends MethodNames<ArrayValue<Value>>>(method: K, ...args: MethodArguments<ArrayValue<Value>, K>): A<ReturnType<Methods<ArrayValue<Value>, K>>[]>;

  mapWithKeys<const Result extends MappedValue, This = undefined>(callback: (
    this: This,
    value: ArrayValue<Value>,
    index: number,
    array: ToArray<Value>,
  ) => Result, thisArg?: This): MapWithKeysResult<Result>;

  /**
   * Plucks the selected key from each entry in the array.
   */
  pluck<K extends keyof ArrayValue<Value>>(key: K): ArrayValue<Value>[K][];

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

  /**
   * Picks a random element from the array.
   */
  random(): ArrayValue<Value>;

  /**
   * Picks a set of random elements from the array, up to the array's length.
   */
  randoms<T>(count?: number): T[];

  /**
   * Returns the length of an array without counting empty keys.
   *
   * @example ```ts
   * A.realLength([1,2,3,4]) // 4
   * A.realLength([,,,1,,,2,3]) // 3
   * ```
   */
  realLength(): number;

  /**
   * Reverses the array in place.
   */
  reverse(): A<Value[keyof Value & number][]>;

  /**
   * Shuffles an array in place.
   *
   * @see https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
   * @see https://bost.ocks.org/mike/shuffle
   */
  shuffle<T>(): A<T[]>;

  /**
   * Sorts an array in place.
   */
  sort<T>(compareFn?: (a: T, b: T) => number): A<T[]>;

  /**
   * Returns a new array where empty keys have been removed.
   *
   * @example ```ts
   * A.toCollapsed([,,,1,,,2,3]) // [1,2,3]
   * ```
   */
  toCollapsed(): ToArray<Value, false>;

  /**
   * Returns a new array with the same values as the original.
   * Non-array iterables are converted to arrays. Arrays are shallow-copied.
   */
  toCopiedArray(): unknown[];
  toCopiedArray<T>(mapFn?: (v: undefined, k: number) => T): T[];
  toCopiedArray(): Writable<Value>;
  toCopiedArray(): ToArray<Value>;
  toCopiedArray(mapFn: (v: undefined, k: number) => unknown): unknown[];

  /** @alias A.toCopiedArray */
  copy(): unknown[];
  copy<T>(mapFn?: (v: undefined, k: number) => T): T[];
  copy(): Writable<Value>;
  copy(): ToArray<Value>;
  copy(mapFn: (v: undefined, k: number) => unknown): unknown[];

  /**
   * Returns a new array where duplicate values have been removed.
   */
  toDeduplicated(): ToArray<Value>;

  /**
   * Returns a copy of the array where the values are reversed.
   */
  toReversed<T>(): T[];

  /**
   * Returns a copy of the array shuffled.
   */
  toShuffled<T>(): T[];

  /**
   * Returns a copy of the array sorted.
   */
  toSorted(compareFn?: (a: ArrayValue<Value>, b: ArrayValue<Value>) => number): ToArray<Value, false>;

  withIndex(index: number, value: ArrayValue<Value>): ToArray<Value, false>;
  withIndex<const V>(index: number, value: V): (ArrayValue<Value> | V)[];

  /** @alias A.withIndex */
  with(index: number, value: ArrayValue<Value>): ToArray<Value, false>;
  with<const V>(index: number, value: V): (ArrayValue<Value> | V)[];
}

const staticMethods = {
  fromAsync,
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
   * Converts any value to an array.
   * `null` and `undefined` are converted to empty arrays.
   * Numbers are used to create arrays of a specific length.
   * Everything else uses the native `Array.from()`.
   */
  toArray,
  /** @alias A.toArray */
  from: toArray,
  /**
   * Wraps the passed value in an array. If the value is nullish, an empty array is returned. If the value is already an array, it is returned as is.
   */
  wrap,
};

const instanceMethods = {
  at,
  /**
   * Returns the values of first array that are not present in the second array.
   */
  difference,
  /**
   * Compare two arrays for equality.
   * If `recursive` is true, nested arrays will be compared as well.
   * Non-array objects are compared using `Object.is()`.
   */
  equals,
  every,
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
   * Shorthand for `Array.isArray()`, but also checks if the array has a length greater than 0.
   */
  isNotEmpty,
  /** @alias A.isNotEmpty */
  isStrict: isNotEmpty,
  isSorted,
  join,
  /**
   * Converts an array of objects into an object keyed by a specified property.
   */
  keyBy,
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
  mapWithKeys,
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
};

const chainableMethods = {
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
  entries,
  fill,
  filter,
  /**
   * Maps the values returned by a filter-mapper and excludes `undefined` results.
   * Alternatively, accepts a separate filter and mapper. Property keys can be
   * used in place of callbacks to read the corresponding value from each item.
   */
  filterMap,
  flatMap,
  forEach,
  keys,
  map,
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
};

assignMethods(A, instanceMethods, false);
assignMethods(A, chainableMethods, true);

const AWithMethods = Object.assign(A, staticMethods, instanceMethods, chainableMethods);

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

export type { Callback, PropertyNames, PropertyValue } from "./methods/filterMap";
export type { MethodArguments, MethodNames, Methods } from "./methods/map";
export type { MappedKeys, MappedValue, MapWithKeysResult } from "./methods/mapWithKeys";
export type { ToArray } from "./methods/toArray";
export type { Arrayable, ArrayValue, IfUncertain } from "./types";
