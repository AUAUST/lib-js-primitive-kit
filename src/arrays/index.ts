// This file is generated. Do not edit it directly.

import type { ToArray } from "./methods/toArray";

import { collapse } from "./methods/collapse";
import { deduplicate } from "./methods/deduplicate";
import { difference } from "./methods/difference";
import { equals } from "./methods/equals";
import { first } from "./methods/first";
import { firstKey } from "./methods/firstKey";
import { flat } from "./methods/flat";
import { hasDuplicates } from "./methods/hasDuplicates";
import { includes } from "./methods/includes";
import { intersection } from "./methods/intersection";
import { isArray } from "./methods/isArray";
import { isIterable } from "./methods/isIterable";
import { isNotArray } from "./methods/isNotArray";
import { isNotEmpty } from "./methods/isNotEmpty";
import { keyBy } from "./methods/keyBy";
import { last } from "./methods/last";
import { lastKey } from "./methods/lastKey";
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
import { wrap } from "./methods/wrap";
import { Arrayable } from "./types";

class ABase<
  const Input extends Arrayable,
  Value extends any[] = ToArray<Input>,
> {
  readonly value: Value;

  constructor(value: Input) {
    this.value = toArray(value) as ToArray<Input> & Value;
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
}

class AFacade<const Input extends Arrayable, Value extends any[] = ToArray<Input>> extends ABase<Input, Value> {}

const A = Object.assign(AFacade, {
  /**
   * Collapse the array in place.
   *
   * @example ```ts
   * A.collapse([,,,1,,,2,3]) // [1,2,3]
   * ```
   */
  collapse,
  /**
   * Removes duplicate values from the array in place.
   *
   * @see https://stackoverflow.com/questions/32510114/remove-duplicates-algorithm-in-place-and-stable-javascript
   */
  deduplicate,
  /** Returns the values of first array that are not present in the second array. */
  difference,
  /**
   * Compare two arrays for equality.
   * If `recursive` is true, nested arrays will be compared as well.
   * Non-array objects are compared using `Object.is()`.
   */
  equals,
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
  /** Returns a new array with all sub-array elements concatenated into it recursively up to the specified depth. */
  flat,
  /** Returns a boolean whether the array has duplicate values. */
  hasDuplicates,
  /** Returns whether the array contains the given value. */
  includes,
  /** @alias A.includes */
  contains: includes,
  /** Returns the values of the first array that are also present in the second array. */
  intersection,
  /** Shorthand for `Array.isArray()`. */
  isArray,
  /** @alias A.isArray */
  is: isArray,
  /** Returns a boolean whether the given input is iterable. */
  isIterable,
  /** Shorthand for `!Array.isArray()`. */
  isNotArray,
  /** Shorthand for `Array.isArray()`, but also checks if the array has a length greater than 0. */
  isNotEmpty,
  /** @alias A.isNotEmpty */
  isStrict: isNotEmpty,
  /** Converts an array of objects into an object keyed by a specified property. */
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
  /**
   * Returns the last key in the array.
   *
   * @example ```ts
   * A.lastKey([1,2,3]) // 2
   * A.lastKey([,,,1,,,2,3]) // 7
   * ```
   */
  lastKey,
  /** Plucks the selected key from each entry in the array. */
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
  /** Picks a random element from the array. */
  random,
  /** Picks a set of random elements from the array, up to the array's length. */
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
  /** Reverses the array in place. */
  reverse,
  /**
   * Shuffles an array in place.
   *
   * @see https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
   * @see https://bost.ocks.org/mike/shuffle
   */
  shuffle,
  /** Sorts an array in place. */
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
  /** Returns a new array where duplicate values have been removed. */
  toDeduplicated,
  /** Returns a copy of the array where the values are reversed. */
  toReversed,
  /** Returns a copy of the array shuffled. */
  toShuffled,
  /** Returns a copy of the array sorted. */
  toSorted,
  /** Wraps the passed value in an array. If the value is nullish, an empty array is returned. If the value is already an array, it is returned as is. */
  wrap,
});

const WrappedA = new Proxy(A as typeof A & typeof toArray, {
  apply(_target, _thisArgument, argumentsList) {
    return toArray(...argumentsList);
  },
});

export { WrappedA as A };

export type { ToArray } from "./methods/toArray";
export type { Arrayable, ArrayValue, IfUncertain } from "./types";
