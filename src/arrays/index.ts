import {
  arrayEquals,
  collapse,
  deduplicate,
  difference,
  first,
  firstKey,
  flat,
  hasDuplicates,
  includes,
  intersection,
  isArray,
  isIterable,
  isStrictArray,
  last,
  lastKey,
  pluck,
  random,
  randoms,
  realLength,
  reverse,
  shuffle,
  sort,
  toArray,
  toCollapsed,
  toCopiedArray,
  toDeduplicated,
  toReversed,
  toShuffled,
  toSorted,
  wrap,
  type ToArrayFunction,
} from "~/arrays/methods";

/**
 * The A class, for Array, provides useful methods for working with arrays.
 */
class A extends Array {
  /**
   * Converts any value to an array.
   * `null` and `undefined` are converted to empty arrays.
   * Numbers are used to create arrays of a specific length.
   * Everything else uses the native `Array.from()`.
   */
  static from = toArray;

  /** Shorthand for `Array.isArray()`. */
  static is = isArray;

  /** Shorthand for `Array.isArray()`, but also checks if the array has a length greater than 0. */
  static isStrict = isStrictArray;

  /** Returns a boolean whether the given input is iterable. */
  static isIterable = isIterable;

  /**
   * Returns a new array with the same values as the original.
   * Non-array iterables are converted to arrays. Arrays are shallow-copied.
   */
  static copy = toCopiedArray;

  /**
   * Compare two arrays for equality.
   * If `recursive` is true, nested arrays will be compared as well.
   * Non-array objects are compared using `Object.is()`.
   */
  static equals = arrayEquals;

  /**
   * Returns the length of an array without counting empty keys.
   *
   * @example ```ts
   * A.realLength([1,2,3,4]) // 4
   * A.realLength([,,,1,,,2,3]) // 3
   * ```
   */
  static realLength = realLength;

  /**
   * Returns the first value of the array that is not `undefined`, and that is not an empty key.
   *
   * @example ```ts
   * A.firstValue([1,2,3]) // 1
   * A.firstValue([,,,1,,,2,3]) // 1
   * ```
   */
  static first = first;

  /**
   * Returns the first existing key in the array.
   *
   * @example ```ts
   * A.firstKey([1,2,3]) // 0
   * A.firstKey([,,,1,,,2,3]) // 3
   * ```
   */
  static firstKey = firstKey;

  /**
   * Returns the last value of the array.
   *
   * @example ```ts
   * A.lastValue([1,2,3]) // 3
   * A.lastValue([,,,1,,,2,3]) // 3
   * ```
   */
  static last = last;

  /**
   * Returns the last key in the array.
   *
   * @example ```ts
   * A.lastKey([1,2,3]) // 2
   * A.lastKey([,,,1,,,2,3]) // 7
   * ```
   */
  static lastKey = lastKey;

  /**
   * Returns a new array where empty keys have been removed.
   *
   * @example ```ts
   * A.toCollapsed([,,,1,,,2,3]) // [1,2,3]
   * ```
   */
  static toCollapsed = toCollapsed;

  /**
   * Collapse the array in place.
   *
   * @example ```ts
   * A.collapse([,,,1,,,2,3]) // [1,2,3]
   * ```
   */
  static collapse = collapse;

  /** Returns a new array where duplicate values have been removed. */
  static toDeduplicated = toDeduplicated;

  /** Removes duplicate values from the array in place. */
  static deduplicate = deduplicate;

  /** Returns a boolean whether the array has duplicate values. */
  static hasDuplicates = hasDuplicates;

  /** Returns a copy of the array sorted. */
  static toSorted = toSorted;

  /** Sorts an array in place. */
  static sort = sort;

  /** Returns a copy of the array shuffled. */
  static toShuffled = toShuffled;

  /** Shuffles an array in place. */
  static shuffle = shuffle;

  /** Returns a copy of the array where the values are reversed. */
  static toReversed = toReversed;

  /** Reverses the array in place. */
  static reverse = reverse;

  /** Picks a random element from the array. */
  static random = random;

  /** Picks a set of random elements from the array, up to the array's length. */
  static randoms = randoms;

  /** Returns whether the array contains the given value. */
  static includes = includes;

  /** Returns the values of first array that are not present in the second array. */
  static difference = difference;

  /** Returns the values of the first array that are also present in the second array. */
  static intersection = intersection;

  /** Wraps the passed value in an array. If the value is nullish, an empty array is returned. If the value is already an array, it is returned as is. */
  static wrap = wrap;

  /** Returns a new array with all sub-array elements concatenated into it recursively up to the specified depth. */
  static flat = flat;

  /** Plucks the selected key from each entry in the array. */
  static pluck = pluck;
}

const WrappedA = new Proxy(A as typeof A & ToArrayFunction, {
  apply(target, _, argumentsList) {
    // @ts-ignore
    return target.from(...argumentsList);
  },
});

export type { Arrayable } from "~/arrays/types";
export { WrappedA as A };
