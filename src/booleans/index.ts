// This file is generated. Do not edit it directly.

import type { Booleanifiable, ToBoolean } from "./types";

import { assignMethods } from "../utils/assignMethods";
import { all } from "./methods/all";
import { and } from "./methods/and";
import { equals } from "./methods/equals";
import { isBoolean } from "./methods/isBoolean";
import { isLooseBoolean } from "./methods/isLooseBoolean";
import { isNotBoolean } from "./methods/isNotBoolean";
import { nand } from "./methods/nand";
import { none } from "./methods/none";
import { nor } from "./methods/nor";
import { not } from "./methods/not";
import { notAll } from "./methods/notAll";
import { or } from "./methods/or";
import { random } from "./methods/random";
import { some } from "./methods/some";
import { toBoolean } from "./methods/toBoolean";
import { toNumber } from "./methods/toNumber";
import { toString } from "./methods/toString";
import { xnor } from "./methods/xnor";
import { xor } from "./methods/xor";

class B<
  const Input extends Booleanifiable,
  Value extends boolean = ToBoolean<Input>,
> {
  readonly value: Value;

  constructor(value: Input) {
    this.value = toBoolean(value) as ToBoolean<Input> & Value;
  }

  static make<Input extends Booleanifiable>(value: Input) {
    return new this(value);
  }

  valueOf(): Value {
    return this.value;
  }

  toBoolean(): Value {
    return this.value;
  }

  [Symbol.toPrimitive](): Value {
    return this.value;
  }
}

interface B<Input extends Booleanifiable, Value extends boolean = ToBoolean<Input>> {
  /**
   * The logical AND operator. Returns `true` if both `a` and `b` are truthy.
   */
  and(b: any): boolean;

  /**
   * Compares two boolean after converting them to booleans using `B.from()`.
   */
  equals(b: any): boolean;

  /**
   * The logical NAND operator. Returns `true` if either `a` or `b` are falsy.
   */
  nand(b: any): boolean;

  /**
   * The logical NOR operator. Returns `true` if both `a` and `b` are falsy.
   */
  nor(b: any): boolean;

  /**
   * The logical NOT operator. Returns the opposite of `a` converted to a boolean.
   */
  not(): boolean;

  /**
   * The logical OR operator. Returns `true` if either `a` or `b` are truthy.
   */
  or(b: any): boolean;

  /**
   * Returns `1` if the input is truthy, `0` otherwise.
   */
  toNumber(): number;

  /**
   * Returns `"true"` if the input is truthy, `"false"` otherwise.
   */
  toString(): string;

  /**
   * The logical XNOR operator. Returns `true` if either both `a` and `b` are truthy or both are falsy.
   */
  xnor(b: any): boolean;

  /**
   * The logical XOR operator. Returns `true` if either `a` or `b` are truthy, but not both nor neither.
   */
  xor(b: any): boolean;
}

const staticMethods = {
  /**
   * Returns `true` if all the given values are `true` when converted by `toBoolean`.
   */
  all,
  /**
   * Is-boolean check. Shortcut for `typeof x === "boolean"`.
   */
  isBoolean,
  /** @alias B.isBoolean */
  is: isBoolean,
  /**
   * A loose is-boolean check. Returns `true` for any value that directly represents a boolean.
   *
   * Returns `true` for booleans, strings that case-insensitively match `"`true`"` or `"`false`"`,
   * numbers that are `0` or `1` and for objects which `valueOf()` method returns one of the above.
   * Returns ``false` for any other value.
   */
  isLooseBoolean,
  /**
   * Is-not-boolean check. Shortcut for `typeof x !== "boolean"`.
   */
  isNotBoolean,
  /**
   * Returns `true` if none of the given values are `true` when converted by `toBoolean`.
   */
  none,
  /**
   * Returns `true` if any of the given values are `false` when converted by `toBoolean`.
   */
  notAll,
  /**
   *  Returns a random boolean. A bias can be provided as a number between `0` and `1`.
   * `0.5`, the default, will return `true` or `false` with equal probability.
   * `0` will always return `false`, `1` will always return `true`.
   */
  random,
  /**
   * Returns `true` if any of the given values are `true` when converted by `toBoolean`.
   */
  some,
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
  toBoolean,
  /** @alias B.toBoolean */
  from: toBoolean,
};

const instanceMethods = {
  /**
   * The logical AND operator. Returns `true` if both `a` and `b` are truthy.
   */
  and,
  /**
   * Compares two boolean after converting them to booleans using `B.from()`.
   */
  equals,
  /**
   * The logical NAND operator. Returns `true` if either `a` or `b` are falsy.
   */
  nand,
  /**
   * The logical NOR operator. Returns `true` if both `a` and `b` are falsy.
   */
  nor,
  /**
   * The logical NOT operator. Returns the opposite of `a` converted to a boolean.
   */
  not,
  /**
   * The logical OR operator. Returns `true` if either `a` or `b` are truthy.
   */
  or,
  /**
   * Returns `1` if the input is truthy, `0` otherwise.
   */
  toNumber,
  /**
   * Returns `"true"` if the input is truthy, `"false"` otherwise.
   */
  toString,
  /**
   * The logical XNOR operator. Returns `true` if either both `a` and `b` are truthy or both are falsy.
   */
  xnor,
  /**
   * The logical XOR operator. Returns `true` if either `a` or `b` are truthy, but not both nor neither.
   */
  xor,
};

assignMethods(B, instanceMethods, false);

const BWithMethods = Object.assign(B, staticMethods, instanceMethods);

export type BInstance<Input extends Booleanifiable = Booleanifiable, Value extends boolean = ToBoolean<Input>> = B<Input, Value>

function b<const Input extends Booleanifiable>(value: Input): B<Input> {
  return new B(value);
}

const WrappedB = new Proxy(BWithMethods as typeof BWithMethods & typeof toBoolean, {
  apply(_target, _thisArgument, argumentsList) {
    return toBoolean(...argumentsList);
  },
});

export { WrappedB as B, b };

export type { Booleanifiable, BooleanValue, ToBoolean } from "./types";
