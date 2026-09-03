import {
  collapse,
  deduplicate,
  difference,
  equals,
  first,
  firstKey,
  flat,
  hasDuplicates,
  includes,
  intersection,
  isArray,
  isIterable,
  isNotArray,
  isStrictArray,
  keyBy,
  last,
  lastKey,
  pluck,
  pull,
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
} from "~/arrays/methods";

/**
 * The A class, for Array, provides useful methods for working with arrays.
 */
class A extends Array {
  static from = toArray;

  static is = isArray;

  static isNot = isNotArray;

  static isStrict = isStrictArray;

  static isIterable = isIterable;

  static copy = toCopiedArray;

  static equals = equals;

  static realLength = realLength;

  static first = first;

  static firstKey = firstKey;

  static last = last;

  static lastKey = lastKey;

  static toCollapsed = toCollapsed;

  static collapse = collapse;

  static toDeduplicated = toDeduplicated;

  static deduplicate = deduplicate;

  static hasDuplicates = hasDuplicates;

  static toSorted = toSorted;

  static sort = sort;

  static toShuffled = toShuffled;

  static shuffle = shuffle;

  static toReversed = toReversed;

  static reverse = reverse;

  static random = random;

  static randoms = randoms;

  static includes = includes;

  static difference = difference;

  static intersection = intersection;

  static wrap = wrap;

  static flat = flat;

  static pluck = pluck;

  static keyBy = keyBy;

  static pull = pull;

  /** @see A.pull */
  static remove = pull;
}

const WrappedA = new Proxy(A as typeof A & typeof toArray, {
  apply(target, _, argumentsList) {
    return target.from(...argumentsList);
  },
});

export type { ToArray } from "~/arrays/methods";
export type { Arrayable } from "~/arrays/types";
export { WrappedA as A };
