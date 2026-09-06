// This file is generated. Do not edit it directly.

import type { ToObject } from "./methods/toObject";

import { clone } from "./methods/clone";
import { deepGet } from "./methods/deepGet";
import { defineProperty } from "./methods/defineProperty";
import { definePropertyIfUnset } from "./methods/definePropertyIfUnset";
import { entries } from "./methods/entries";
import { equals } from "./methods/equals";
import { flat } from "./methods/flat";
import { groupBy } from "./methods/groupBy";
import { hasKey } from "./methods/hasKey";
import { hasKeys } from "./methods/hasKeys";
import { isNotObject } from "./methods/isNotObject";
import { isObject } from "./methods/isObject";
import { isPlainObject } from "./methods/isPlainObject";
import { keys } from "./methods/keys";
import { omit } from "./methods/omit";
import { pick } from "./methods/pick";
import { pull } from "./methods/pull";
import { toObject } from "./methods/toObject";
import { values } from "./methods/values";

class OBase<const Input, Value extends object = ToObject<Input>> {
  readonly value: Value;

  constructor(value: Input) {
    this.value = toObject(value) as ToObject<Input> & Value;
  }

  valueOf(): Value {
    return this.value;
  }
}

class OFacade<const Input, Value extends object = ToObject<Input>> extends OBase<Input, Value> {}

const O = Object.assign(OFacade, {
  /**
   * Clones an object deeply. Class instances are copied by reference.
   *
   * The second argument is boolean whether to clone arrays as well.
   * If `false`, arrays will be copied by reference. If `true` (default), arrays will be cloned deeply as well.
   */
  clone,
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
  deepGet,
  defineProperty,
  /**  Defines a property on an object, only if it doesn't exist yet. */
  definePropertyIfUnset,
  /** Returns exactly the same as Object.entries(), but strongly types the return value. */
  entries,
  /**
   * Compares two objects for equality, using Object.is() for non-objects and deep comparison of properties for objects and arrays.
   *
   * TODO: Improve type guards for this method if someday TypeScript adds supports for multiple assertions.
   */
  equals,
  /**
   * Deeply flattens an object.
   * Returns a new object where all properties are at the root level, with the keys using dot notation by default.
   *
   * A separator might be provided to use a different notation.
   * It may either be a string in which case it'll be used to join the keys, or a function that takes the keys as arguments and returns a string, number or symbol.
   */
  flat,
  /**
   * Groups an array of objects by a key or a function that returns a key.
   * If the key is a function, it'll be called with the object as the first argument and the index as the second.
   */
  groupBy,
  /**
   * Returns a boolean whether the given key is present in the given object. Equivalent to `key in obj`.
   * If you need to check for multiple keys, use `O.hasKeys()` instead.
   */
  hasKey,
  /**
   * Checks whether an object has keys.
   * Allows to pass an array of keys to check for; if absent, checks for any own property.
   * Passing something that isn't an Object as the first argument will return false.
   */
  hasKeys,
  /**
   * Checks if a value is not an object.
   */
  isNotObject,
  /** @alias O.isNotObject */
  isNot: isNotObject,
  /**
   * Simple is-object check, to avoid repeating `typeof x === "object" && x !== null`.
   *
   * Returns `false` for `null` and other primitive values.
   * Returns `false` for functions.
   * Returns `true` class instances.
   * Returns `true` or `false` for arrays depending on the value of `allowArray`.
   */
  isObject,
  /** @alias O.isObject */
  is: isObject,
  /**
   * Returns a boolean whether the given input is an object.
   *
   * Returns `false` for `null`, class instances, functions, arrays and all primitive types.
   */
  isPlainObject,
  /** @alias O.isPlainObject */
  isStrict: isPlainObject,
  /** @alias O.isPlainObject */
  isPlain: isPlainObject,
  /** Returns exactly the same as Object.keys(), but strongly types the return value. */
  keys,
  /**
   * Returns a new object with the same properties as the input object except for the ones that are present in the `omit` array.
   * Passing an empty array will return a shallow copy of the input object.
   */
  omit,
  /**
   * Picks a subset of properties from an object. Missing properties are ignored.
   * Missing properties are included as `undefined` in the result.
   */
  pick,
  /**
   * Returns an object with the provided properties pulled out of the input object.
   * The properties are removed from the input object.
   *
   * If you want to get a subset of properties without touching the input object, use `O.pick()` instead.
   */
  pull,
  /**
   * Converts any value to an object.
   * `null` and `undefined` are converted to empty objects.
   * Arrays are converted using `Object.assign()`.
   * Booleans, numbers and strings are converted to objects by being passed to the Object constructor.
   * All other values are returned as-is.
   */
  toObject,
  /** @alias O.toObject */
  from: toObject,
  /** Returns exactly the same as Object.values(), but strongly types the return value. */
  values,
});

const WrappedO = new Proxy(O as typeof O & typeof toObject, {
  apply(_target, _thisArgument, argumentsList) {
    return toObject(...argumentsList);
  },
});

export { WrappedO as O };

export type { PropertyDescriptorType } from "./methods/defineProperty";
export type { Mapped, Omitted, OmittedMapped } from "./methods/omit";
export type { Picked } from "./methods/pick";
export type { ToObject } from "./methods/toObject";
export type { DeepValues, GetDeepValues, HasKeysOptions, ObjectType, WithKeys, Writable, WritableRecursive } from "./types";
