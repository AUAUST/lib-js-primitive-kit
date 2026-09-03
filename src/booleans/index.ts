import {
  all,
  and,
  equals,
  isBoolean,
  isLooseBoolean,
  isNotBoolean,
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
  static from = toBoolean;

  static is = isBoolean;

  static isNot = isNotBoolean;

  static isLoose = isLooseBoolean;

  static equals = equals;

  static and = and;

  static or = or;

  static not = not;

  static xor = xor;

  static nand = nand;

  static nor = nor;

  static xnor = xnor;

  static all = all;

  /** @see B.all */
  static allTrue = all;

  static some = some;

  /** @see B.some */
  static anyTrue = some;

  static none = none;

  /** @see B.none */
  static allFalse = none;

  static notAll = notAll;

  /** @see B.notAll */
  static anyFalse = notAll;

  static toNumber = toNumber;

  static toString = toString;

  static random = random;
}

const WrappedB = new Proxy(B as typeof B & typeof toBoolean, {
  apply(target, _, argumentsList) {
    return target.from(...argumentsList);
  },
});

export type { Booleanifiable } from "~/booleans/types";
export { WrappedB as B };
