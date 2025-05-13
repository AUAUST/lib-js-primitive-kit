import {
  clone,
  deepGet,
  defineProperty,
  definePropertyIfUnset,
  entries,
  equals,
  flat,
  groupBy,
  hasKey,
  hasKeys,
  isNotObject,
  isObject,
  isStrictObject,
  keys,
  omit,
  pick,
  pull,
  toObject,
  values,
} from "~/objects/methods";

// That mess is required to make TS happy.
// Those are the keys which `O`'s implementation signature don't extend `Object`.
// It's used to make TypeScript happy by excluding them from the `Object` type.
type Diff = "keys" | "values" | "entries" | "defineProperty";
const Obj = Object as Omit<typeof Object, Diff> & (new () => Object);

/** The O class, for Object, provides useful methods for working with objects. */
class O extends Obj {
  /**
   * Converts any value to an object.
   * `null` and `undefined` are converted to empty objects.
   * Arrays are converted using `Object.assign()`.
   * Booleans, numbers and strings are converted to objects by being passed to the Object constructor.
   * All other values are returned as-is.
   */
  static from = toObject;

  /**
   * Simple is-object check, to avoid repeating `typeof x === "object" && x !== null`.
   *
   * Returns `false` for `null` and other primitive values.
   * Returns `false` for functions.
   * Returns `true` class instances.
   * Returns `true` or `false` for arrays depending on the value of `allowArray`.
   */
  static is = isObject;

  static isNot = isNotObject;

  /**
   * Returns a boolean whether the given input is an object.
   *
   * Returns `false` for `null`, class instances, functions, arrays and all primitive types.
   */
  static isStrict = isStrictObject;

  /** Returns exactly the same as Object.keys(), but strongly types the return value. */
  static keys = keys;

  /** Returns exactly the same as Object.values(), but strongly types the return value. */
  static values = values;

  /** Returns exactly the same as Object.entries(), but strongly types the return value. */
  static entries = entries;
  /**
   * Compares two objects for equality, using Object.is() for non-objects and deep comparison of properties for objects and arrays.
   *
   * TODO: Improve type guards for this method if someday TypeScript adds supports for multiple assertions.
   */
  static equals = equals;

  /**
   * Returns a boolean whether the given key is present in the given object. Equivalent to `key in obj`.
   * If you need to check for multiple keys, use `O.hasKeys()` instead.
   */
  static in = hasKey;

  /**
   * Deeply gets a value from an object, each key being a nested property.
   * If only one key is passed, it'll try to access the property using dot notation.
   * If you need to access a nested property that contains a dot, it'll work as expected.
   * If you need to access a root property that contains a dot, you must pass `false` as the second argument.
   *
   * @example ```ts
   * const obj = {
   *   foo: {
   *     bar: [ "value" ]
   *   },
   *   "foo.bar.0": {
   *     baz: 1
   *   }
   * };
   *
   * O.deepGet(obj, "foo", "bar", 0); // "value"
   * O.deepGet(obj, "foo.bar.0", "baz"); // 1
   * O.deepGet(obj, "foo.bar.0"); // "value"
   * O.deepGet(obj, "foo.bar.0", false); // { baz: 1 }
   * ```
   */
  static deepGet = deepGet;

  /**
   * Deeply flattens an object.
   * Returns a new object where all properties are at the root level, with the keys using dot notation by default.
   *
   * A separator might be provided to use a different notation.
   * It may either be a string in which case it'll be used to join the keys, or a function that takes the keys as arguments and returns a string, number or symbol.
   */
  static flat = flat;

  /**
   * Clones an object deeply. Class instances are copied by reference.
   *
   * The second argument is boolean whether to clone arrays as well.
   * If `false`, arrays will be copied by reference. If `true` (default), arrays will be cloned deeply as well.
   */
  static clone = clone;

  /**
   * Checks whether an object has keys.
   * Allows to pass an array of keys to check for; if absent, checks for any own property.
   * Passing something that isn't an Object as the first argument will return false.
   */
  static hasKeys = hasKeys;

  /** @borrows Object.defineProperty as defineProperty */
  static defineProperty = defineProperty;

  /**  Defines a property on an object, only if it doesn't exist yet. */
  static definePropertyIfUnset = definePropertyIfUnset;

  /**
   * Groups an array of objects by a key or a function that returns a key.
   * If the key is a function, it'll be called with the object as the first argument and the index as the second.
   */
  static groupBy = groupBy;

  /**
   * Picks a subset of properties from an object. Missing properties are ignored.
   * Missing properties are included as `undefined` in the result.
   */
  static pick = pick;

  /**
   * Returns a new object with the same properties as the input object except for the ones that are present in the `omit` array.
   * Passing an empty array will return a shallow copy of the input object.
   */
  static omit = omit;

  /**
   * Returns an object with the provided properties pulled out of the input object.
   * The properties are removed from the input object.
   *
   * If you want to get a subset of properties without touching the input object, use `O.pick()` instead.
   */
  static pull = pull;
}

const WrappedO = new Proxy(O as typeof O & typeof toObject, {
  apply(target, _, argumentsList) {
    return target.from(...argumentsList);
  },
});

export { WrappedO as O };

export type { ToObject } from "~/objects/methods";
export type { ObjectType, Writable, WritableRecursive } from "~/objects/types";
