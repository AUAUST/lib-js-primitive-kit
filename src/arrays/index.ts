// This file is generated. Do not edit it directly.

import type { Stringifiable } from "./../strings/index";
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

type FacadeMethodArguments<Method extends (...args: any[]) => any> =
  Parameters<Method> extends [unknown, ...infer Args] ? Args : never;

class ABase<
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
}

class A<const Input extends Arrayable, Value extends any[] = ToArray<Input>> extends ABase<Input, Value> {
  declare at: (...args: FacadeMethodArguments<typeof at<Value>>) => ReturnType<typeof at<Value>>;
  /**
   * Collapse the array in place.
   *
   * @example ```ts
   * A.collapse([,,,1,,,2,3]) // [1,2,3]
   * ```
   */
  declare collapse: (...args: FacadeMethodArguments<typeof collapse<Value>>) => A<ReturnType<typeof collapse<Value>>>;
  declare concat: <const U>(...args: FacadeMethodArguments<typeof concat<Value, U>>) => A<ReturnType<typeof concat<Value, U>>>;
  /**
   * Removes duplicate values from the array in place.
   *
   * @see https://stackoverflow.com/questions/32510114/remove-duplicates-algorithm-in-place-and-stable-javascript
   */
  declare deduplicate: (...args: FacadeMethodArguments<typeof deduplicate<Value>>) => A<ReturnType<typeof deduplicate<Value>>>;
  /**
   * Returns the values of first array that are not present in the second array.
   */
  declare difference: <T, U>(...args: FacadeMethodArguments<typeof difference<T, U>>) => ReturnType<typeof difference<T, U>>;
  declare entries: (...args: FacadeMethodArguments<typeof entries<Value>>) => A<ReturnType<typeof entries<Value>>>;
  /**
   * Compare two arrays for equality.
   * If `recursive` is true, nested arrays will be compared as well.
   * Non-array objects are compared using `Object.is()`.
   */
  declare equals: (...args: FacadeMethodArguments<typeof equals<Value>>) => ReturnType<typeof equals<Value>>;
  declare every: <S extends ArrayValue<Value>>(...args: FacadeMethodArguments<typeof every<Value, S>>) => ReturnType<typeof every<Value, S>>;
  declare fill: (...args: FacadeMethodArguments<typeof fill<Value>>) => A<ReturnType<typeof fill<Value>>>;
  declare filter: <S extends ArrayValue<Value>>(...args: FacadeMethodArguments<typeof filter<Value, S>>) => A<ReturnType<typeof filter<Value, S>>>;
  declare find: <S extends ArrayValue<Value>>(...args: FacadeMethodArguments<typeof find<Value, S>>) => ReturnType<typeof find<Value, S>>;
  declare findIndex: (...args: FacadeMethodArguments<typeof findIndex<Value>>) => ReturnType<typeof findIndex<Value>>;
  declare findLast: <S extends ArrayValue<Value>>(...args: FacadeMethodArguments<typeof findLast<Value, S>>) => ReturnType<typeof findLast<Value, S>>;
  declare findLastIndex: (...args: FacadeMethodArguments<typeof findLastIndex<Value>>) => ReturnType<typeof findLastIndex<Value>>;
  /**
   * Returns the first value of the array that is not `undefined`, and that is not an empty key.
   *
   * @example ```ts
   * A.firstValue([1,2,3]) // 1
   * A.firstValue([,,,1,,,2,3]) // 1
   * ```
   */
  declare first: (...args: FacadeMethodArguments<typeof first<Value>>) => ReturnType<typeof first<Value>>;
  /**
   * Returns the first existing key in the array.
   *
   * @example ```ts
   * A.firstKey([1,2,3]) // 0
   * A.firstKey([,,,1,,,2,3]) // 3
   * ```
   */
  declare firstKey: (...args: FacadeMethodArguments<typeof firstKey>) => ReturnType<typeof firstKey>;
  /**
   * Returns a new array with all sub-array elements concatenated into it recursively up to the specified depth.
   */
  declare flat: <D extends number = 1>(...args: FacadeMethodArguments<typeof flat<Value, D>>) => ReturnType<typeof flat<Value, D>>;
  declare flatMap: <U, This = undefined>(...args: FacadeMethodArguments<typeof flatMap<Value, U, This>>) => A<ReturnType<typeof flatMap<Value, U, This>>>;
  declare forEach: (...args: FacadeMethodArguments<typeof forEach<Value>>) => A<ReturnType<typeof forEach<Value>>>;
  /**
   * Returns a boolean whether the array has duplicate values.
   */
  declare hasDuplicates: (...args: FacadeMethodArguments<typeof hasDuplicates>) => ReturnType<typeof hasDuplicates>;
  /**
   * Returns whether the array contains the given value.
   */
  declare includes: (...args: FacadeMethodArguments<typeof includes<Value>>) => ReturnType<typeof includes<Value>>;
  /** @alias A.includes */
  declare contains: (...args: FacadeMethodArguments<typeof includes<Value>>) => ReturnType<typeof includes<Value>>;
  declare indexOf: (...args: FacadeMethodArguments<typeof indexOf<Value>>) => ReturnType<typeof indexOf<Value>>;
  /**
   * Returns the values of the first array that are also present in the second array.
   */
  declare intersection: <T>(...args: FacadeMethodArguments<typeof intersection<T>>) => ReturnType<typeof intersection<T>>;
  /**
   * Shorthand for `Array.isArray()`, but also checks if the array has a length greater than 0.
   */
  declare isNotEmpty: (...args: FacadeMethodArguments<typeof isNotEmpty>) => ReturnType<typeof isNotEmpty>;
  /** @alias A.isNotEmpty */
  declare isStrict: (...args: FacadeMethodArguments<typeof isNotEmpty>) => ReturnType<typeof isNotEmpty>;
  declare join: <S extends Stringifiable>(...args: FacadeMethodArguments<typeof join<Value, S>>) => ReturnType<typeof join<Value, S>>;
  /**
   * Converts an array of objects into an object keyed by a specified property.
   */
  declare keyBy: <K extends keyof ArrayValue<Value>>(...args: FacadeMethodArguments<typeof keyBy<Value, K>>) => ReturnType<typeof keyBy<Value, K>>;
  declare keys: (...args: FacadeMethodArguments<typeof keys>) => A<ReturnType<typeof keys>>;
  /**
   * Returns the last value of the array.
   *
   * @example ```ts
   * A.lastValue([1,2,3]) // 3
   * A.lastValue([,,,1,,,2,3]) // 3
   * ```
   */
  declare last: (...args: FacadeMethodArguments<typeof last<Value>>) => ReturnType<typeof last<Value>>;
  declare lastIndexOf: (...args: FacadeMethodArguments<typeof lastIndexOf<Value>>) => ReturnType<typeof lastIndexOf<Value>>;
  /**
   * Returns the last key in the array.
   *
   * @example ```ts
   * A.lastKey([1,2,3]) // 2
   * A.lastKey([,,,1,,,2,3]) // 7
   * ```
   */
  declare lastKey: (...args: FacadeMethodArguments<typeof lastKey>) => ReturnType<typeof lastKey>;
  declare map: <U>(...args: FacadeMethodArguments<typeof map<Value, U>>) => A<ReturnType<typeof map<Value, U>>>;
  /**
   * Plucks the selected key from each entry in the array.
   */
  declare pluck: <K extends keyof ArrayValue<Value>>(...args: FacadeMethodArguments<typeof pluck<Value, K>>) => ReturnType<typeof pluck<Value, K>>;
  /**
   * Removes the specified values from the array.
   * If a single value is passed, all occurrences of that value are removed and the count of removed values is returned.
   * If an array of values is passed, the values contained in the array are removed from the original array
   * and a new array is returned containing the removed values.
   * If a callback is passed, the callback is called for each value in the array.
   * If the callback returns true, the value is removed from the original array and included in the new array that is returned.
   */
  declare pull: <T>(...args: FacadeMethodArguments<typeof pull<T>>) => ReturnType<typeof pull<T>>;
  /**
   * Picks a random element from the array.
   */
  declare random: (...args: FacadeMethodArguments<typeof random<Value>>) => ReturnType<typeof random<Value>>;
  /**
   * Picks a set of random elements from the array, up to the array's length.
   */
  declare randoms: <T>(...args: FacadeMethodArguments<typeof randoms<T>>) => ReturnType<typeof randoms<T>>;
  /**
   * Returns the length of an array without counting empty keys.
   *
   * @example ```ts
   * A.realLength([1,2,3,4]) // 4
   * A.realLength([,,,1,,,2,3]) // 3
   * ```
   */
  declare realLength: (...args: FacadeMethodArguments<typeof realLength<Value>>) => ReturnType<typeof realLength<Value>>;
  /**
   * Reverses the array in place.
   */
  declare reverse: (...args: FacadeMethodArguments<typeof reverse<Value>>) => A<ReturnType<typeof reverse<Value>>>;
  /**
   * Shuffles an array in place.
   *
   * @see https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
   * @see https://bost.ocks.org/mike/shuffle
   */
  declare shuffle: <T>(...args: FacadeMethodArguments<typeof shuffle<T>>) => A<ReturnType<typeof shuffle<T>>>;
  /**
   * Sorts an array in place.
   */
  declare sort: <T>(...args: FacadeMethodArguments<typeof sort<T>>) => A<ReturnType<typeof sort<T>>>;
  /**
   * Returns a new array where empty keys have been removed.
   *
   * @example ```ts
   * A.toCollapsed([,,,1,,,2,3]) // [1,2,3]
   * ```
   */
  declare toCollapsed: (...args: FacadeMethodArguments<typeof toCollapsed<Value>>) => ReturnType<typeof toCollapsed<Value>>;
  /**
   * Returns a new array with the same values as the original.
   * Non-array iterables are converted to arrays. Arrays are shallow-copied.
   */
  declare toCopiedArray: (...args: FacadeMethodArguments<typeof toCopiedArray<Value>>) => ReturnType<typeof toCopiedArray<Value>>;
  /** @alias A.toCopiedArray */
  declare copy: (...args: FacadeMethodArguments<typeof toCopiedArray<Value>>) => ReturnType<typeof toCopiedArray<Value>>;
  /**
   * Returns a new array where duplicate values have been removed.
   */
  declare toDeduplicated: (...args: FacadeMethodArguments<typeof toDeduplicated<Value>>) => ReturnType<typeof toDeduplicated<Value>>;
  /**
   * Returns a copy of the array where the values are reversed.
   */
  declare toReversed: <T>(...args: FacadeMethodArguments<typeof toReversed<T>>) => ReturnType<typeof toReversed<T>>;
  /**
   * Returns a copy of the array shuffled.
   */
  declare toShuffled: <T>(...args: FacadeMethodArguments<typeof toShuffled<T>>) => ReturnType<typeof toShuffled<T>>;
  /**
   * Returns a copy of the array sorted.
   */
  declare toSorted: (...args: FacadeMethodArguments<typeof toSorted<Value>>) => ReturnType<typeof toSorted<Value>>;
  declare withIndex: (...args: FacadeMethodArguments<typeof withIndex<Value>>) => ReturnType<typeof withIndex<Value>>;
  /** @alias A.withIndex */
  declare with: (...args: FacadeMethodArguments<typeof withIndex<Value>>) => ReturnType<typeof withIndex<Value>>;
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

function _wrap(method: any) {
  return function (this: { valueOf(): unknown }, ...args: any[]) {
    return method(this.valueOf(), ...args);
  };
}

function _wrapChainable(method: any) {
  return function (this: { valueOf(): unknown }, ...args: any[]) {
    return new A(method(this.valueOf(), ...args));
  };
}

let _wrapped: (...args: any[]) => any;

Object.assign(A.prototype, {
  at: _wrap(at),
  collapse: _wrapChainable(collapse),
  concat: _wrapChainable(concat),
  deduplicate: _wrapChainable(deduplicate),
  difference: _wrap(difference),
  entries: _wrapChainable(entries),
  equals: _wrap(equals),
  every: _wrap(every),
  fill: _wrapChainable(fill),
  filter: _wrapChainable(filter),
  find: _wrap(find),
  findIndex: _wrap(findIndex),
  findLast: _wrap(findLast),
  findLastIndex: _wrap(findLastIndex),
  first: _wrap(first),
  firstKey: _wrap(firstKey),
  flat: _wrap(flat),
  flatMap: _wrapChainable(flatMap),
  forEach: _wrapChainable(forEach),
  hasDuplicates: _wrap(hasDuplicates),
  includes: (_wrapped = _wrap(includes)),
  contains: _wrapped,
  indexOf: _wrap(indexOf),
  intersection: _wrap(intersection),
  isNotEmpty: (_wrapped = _wrap(isNotEmpty)),
  isStrict: _wrapped,
  join: _wrap(join),
  keyBy: _wrap(keyBy),
  keys: _wrapChainable(keys),
  last: _wrap(last),
  lastIndexOf: _wrap(lastIndexOf),
  lastKey: _wrap(lastKey),
  map: _wrapChainable(map),
  pluck: _wrap(pluck),
  pull: _wrap(pull),
  random: _wrap(random),
  randoms: _wrap(randoms),
  realLength: _wrap(realLength),
  reverse: _wrapChainable(reverse),
  shuffle: _wrapChainable(shuffle),
  sort: _wrapChainable(sort),
  toCollapsed: _wrap(toCollapsed),
  toCopiedArray: (_wrapped = _wrap(toCopiedArray)),
  copy: _wrapped,
  toDeduplicated: _wrap(toDeduplicated),
  toReversed: _wrap(toReversed),
  toShuffled: _wrap(toShuffled),
  toSorted: _wrap(toSorted),
  withIndex: (_wrapped = _wrap(withIndex)),
  with: _wrapped,
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

export type { MethodNames } from "./methods/map";
export type { ToArray } from "./methods/toArray";
export type { Arrayable, ArrayValue, IfUncertain } from "./types";
