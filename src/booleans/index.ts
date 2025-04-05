import {
  all,
  and,
  equals,
  isBoolean,
  isLooseBoolean,
  nand,
  none,
  nor,
  not,
  notAll,
  or,
  random,
  some,
  toBoolean,
  toNumber,
  toString,
  xnor,
  xor,
} from "~/booleans/methods";

/**
 * The B class, for Boolean, provides useful methods for working with booleans.
 *
 * Warning: All methods in this class have the option to convert their input to a boolean using `B.from()`.
 * This is usually done by passing a truthy value to the last argument of the method.
 */
class B extends Boolean {
  /**
   * Converts any value to a boolean.
   *
   * Numbers are converted to `true` except for `0` and `NaN`.
   * Strings are converted to `true` except for ones which are `"0"`, `"false"` or `""` after being trimmed and lowercased.
   * Booleans are returned as is.
   * `null` and `undefined` are converted to `false`.
   * Objects are converted by applying the above rules to their `valueOf()` method.
   *
   * @example ```ts
   * B.from(new String("")) // `false` instead of `true` in the original Boolean()
   * B.from(new Number(0)) // `false` instead of `true` in the original Boolean()
   * B.from(new Boolean(`false`)) // `false` instead of `true` in the original Boolean()
   *
   * B.from("") // false
   * B.from(0) // false
   * B.from(false) // false
   * B.from("false") // false
   * B.from("0") // false
   * B.from(" \r\n") // false
   * B.from(null) // false
   * B.from(undefined) // false
   * B.from(NaN) // false
   *
   * B.from("foo") // false
   * B.from(1) // false
   * B.from({}) // false
   * B.from([]) // false
   * ```
   */
  static from = toBoolean;

  /** A simple is-boolean check. Shortcut for `typeof x === "boolean"`. */
  static is = isBoolean;

  /**
   * A loose is-boolean check. Returns `true` for any value that directly represents a boolean.
   *
   * Returns `true` for booleans, strings that case-insensitively match `"`true`"` or `"`false`"`,
   * numbers that are `0` or `1` and for objects which `valueOf()` method returns one of the above.
   * Returns ``false` for any other value.
   */
  static isLoose = isLooseBoolean;

  /** Compares two boolean after converting them to booleans using `B.from()`. */
  static equals = equals;

  /** The logical AND operator. Returns `true` if both `a` and `b` are truthy. */
  static and = and;

  /** The logical OR operator. Returns `true` if either `a` or `b` are truthy. */
  static or = or;

  /** The logical NOT operator. Returns the opposite of `a` converted to a boolean. */
  static not = not;

  /** The logical XOR operator. Returns `true` if either `a` or `b` are truthy, but not both nor neither. */
  static xor = xor;

  /** The logical NAND operator. Returns `true` if either `a` or `b` are falsy. */
  static nand = nand;

  /** The logical NOR operator. Returns `true` if both `a` and `b` are falsy. */
  static nor = nor;

  /** The logical XNOR operator. Returns `true` if either both `a` and `b` are truthy or both are falsy. */
  static xnor = xnor;

  /** Returns `true` if all the given values are `true` when converted by `toBoolean`. */
  static all = all;

  /** @see B.all */
  static allTrue = all;

  /** Returns `true` if any of the given values are `true` when converted by `toBoolean`. */
  static some = some;

  /** @see B.some */
  static anyTrue = some;

  /** Returns `true` if none of the given values are `true` when converted by `toBoolean`. */
  static none = none;

  /** @see B.none */
  static allFalse = none;

  /** Returns `true` if any of the given values are `false` when converted by `toBoolean`. */
  static notAll = notAll;

  /** @see B.notAll */
  static anyFalse = notAll;

  /** Returns `1` if the input is truthy, `0` otherwise. */
  static toNumber = toNumber;

  /** Returns `"true"` if the input is truthy, `"false"` otherwise. */
  static toString = toString;

  /**
   *  Returns a random boolean. A bias can be provided as a number between `0` and `1`.
   * `0.5`, the default, will return `true` or `false` with equal probability.
   * `0` will always return `false`, `1` will always return `true`.
   */
  static random = random;
}

const WrappedB = new Proxy(
  // The proxy makes it callable, using the `from()` method.
  B as typeof B & {
    (value: any, smart?: boolean): boolean;
  },
  {
    apply(target, _, argumentsList) {
      // @ts-ignore
      return target.from(...argumentsList);
    },
  }
);

export type { Booleanifiable } from "~/booleans/types";
export { WrappedB as B };
