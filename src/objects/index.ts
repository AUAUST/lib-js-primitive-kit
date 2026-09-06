// This file is generated. Do not edit it directly.

import type { ToObject } from "./methods/toObject";
import type { GenericRecord, HasKeysOptions } from "./types";

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

type FacadeMethodArguments<Method extends (...args: any[]) => any> =
  Parameters<Method> extends [unknown, ...infer Args] ? Args : never;

class OBase<
  const Input extends GenericRecord<PropertyKey>,
  Value extends GenericRecord = ToObject<Input>,
> {
  readonly value: Value;

  constructor(value: Input) {
    this.value = toObject(value) as ToObject<Input> & Value;
  }

  static make<Input extends GenericRecord<PropertyKey>>(value: Input) {
    return new this(value);
  }

  valueOf(): Value {
    return this.value;
  }
}

class O<const Input extends GenericRecord<PropertyKey>, Value extends GenericRecord = ToObject<Input>> extends OBase<Input, Value> {
  /**
   * Clones an object deeply. Class instances are copied by reference.
   *
   * The second argument is a boolean whether to clone arrays as well.
   * If `false`, arrays will be copied by reference. If `true` (default), arrays will be cloned deeply as well.
   */
  declare clone: (...args: FacadeMethodArguments<typeof clone<Value>>) => O<ReturnType<typeof clone<Value>>>;
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
  declare deepGet: (...args: FacadeMethodArguments<typeof deepGet<Value>>) => ReturnType<typeof deepGet<Value>>;
  declare defineProperty: <K extends PropertyKey, V extends PropertyDescriptor>(...args: FacadeMethodArguments<typeof defineProperty<Value, K, V>>) => O<ReturnType<typeof defineProperty<Value, K, V>>>;
  /**
   * Defines a property on an object, only if it doesn't exist yet.
   */
  declare definePropertyIfUnset: <K extends PropertyKey, V extends PropertyDescriptor>(...args: FacadeMethodArguments<typeof definePropertyIfUnset<Value, K, V>>) => O<ReturnType<typeof definePropertyIfUnset<Value, K, V>>>;
  /**
   * Returns exactly the same as Object.entries(), but strongly types the return value.
   */
  declare entries: (...args: FacadeMethodArguments<typeof entries<Value>>) => ReturnType<typeof entries<Value>>;
  /**
   * Compares two objects for equality, using Object.is() for non-objects and deep comparison of properties for objects and arrays.
   *
   * TODO: Improve type guards for this method if someday TypeScript adds supports for multiple assertions.
   */
  declare equals: (...args: FacadeMethodArguments<typeof equals<Value>>) => ReturnType<typeof equals<Value>>;
  /**
   * Deeply flattens an object.
   * Returns a new object where all properties are at the root level, with the keys using dot notation by default.
   *
   * A separator might be provided to use a different notation.
   * It may either be a string in which case it'll be used to join the keys, or a function that takes the keys as arguments and returns a string, number or symbol.
   */
  declare flat: (...args: FacadeMethodArguments<typeof flat<Value>>) => O<ReturnType<typeof flat<Value>>>;
  /**
   * Returns a boolean whether the given key is present in the given object. Equivalent to `key in obj`.
   * If you need to check for multiple keys, use `O.hasKeys()` instead.
   */
  declare hasKey: <const K extends PropertyKey>(...args: FacadeMethodArguments<typeof hasKey<Value, K>>) => ReturnType<typeof hasKey<Value, K>>;
  /** @alias O.hasKey */
  declare in: <const K extends PropertyKey>(...args: FacadeMethodArguments<typeof hasKey<Value, K>>) => ReturnType<typeof hasKey<Value, K>>;
  /**
   * Checks whether an object has keys.
   * Allows to pass an array of keys to check for; if absent, checks for any own property.
   * Passing something that isn't an Object as the first argument will return false.
   */
  declare hasKeys: <const O extends readonly PropertyKey[] | HasKeysOptions | undefined =
    undefined>(...args: FacadeMethodArguments<typeof hasKeys<Value, O>>) => ReturnType<typeof hasKeys<Value, O>>;
  /**
   * Returns a boolean whether the given input is an object.
   *
   * Returns `false` for `null`, class instances, functions, arrays and all primitive types.
   */
  declare isPlainObject: (...args: FacadeMethodArguments<typeof isPlainObject>) => ReturnType<typeof isPlainObject>;
  /** @alias O.isPlainObject */
  declare isStrict: (...args: FacadeMethodArguments<typeof isPlainObject>) => ReturnType<typeof isPlainObject>;
  /** @alias O.isPlainObject */
  declare isPlain: (...args: FacadeMethodArguments<typeof isPlainObject>) => ReturnType<typeof isPlainObject>;
  declare keys: (...args: FacadeMethodArguments<typeof keys<Value>>) => ReturnType<typeof keys<Value>>;
  /**
   * Returns a new object with the same properties as the input object except for the ones that are present in the `omit` array.
   * Passing an empty array will return a shallow copy of the input object.
   */
  declare omit: <K extends keyof Value>(...args: FacadeMethodArguments<typeof omit<Value, K>>) => O<ReturnType<typeof omit<Value, K>>>;
  /**
   * Picks a subset of properties from an object. Missing properties are ignored.
   * Missing properties are included as `undefined` in the result.
   */
  declare pick: <K extends keyof Value, C extends ((key: K, value: Value[keyof Value]) => any) | undefined = undefined>(...args: FacadeMethodArguments<typeof pick<Value, K, C>>) => O<ReturnType<typeof pick<Value, K, C>>>;
  /**
   * Returns an object with the provided properties pulled out of the input object.
   * The properties are removed from the input object.
   *
   * If you want to get a subset of properties without touching the input object, use `O.pick()` instead.
   */
  declare pull: <K extends keyof Value | readonly (keyof Value | PropertyKey)[]>(...args: FacadeMethodArguments<typeof pull<Value, K>>) => ReturnType<typeof pull<Value, K>>;
  /**
   * Returns exactly the same as Object.values(), but strongly types the return value.
   */
  declare values: (...args: FacadeMethodArguments<typeof values<Value>>) => ReturnType<typeof values<Value>>;
}

const OWithMethods = Object.assign(O, {
  /**
   * Clones an object deeply. Class instances are copied by reference.
   *
   * The second argument is a boolean whether to clone arrays as well.
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
  /**
   * Defines a property on an object, only if it doesn't exist yet.
   */
  definePropertyIfUnset,
  /**
   * Returns exactly the same as Object.entries(), but strongly types the return value.
   */
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
  /** @alias O.hasKey */
  in: hasKey,
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
  /**
   * Returns exactly the same as Object.values(), but strongly types the return value.
   */
  values,
});

function _wrap(method: any) {
  return function (this: { valueOf(): unknown }, ...args: any[]) {
    return method(this.valueOf(), ...args);
  };
}

function _wrapChainable(method: any) {
  return function (this: { valueOf(): unknown }, ...args: any[]) {
    return new O(method(this.valueOf(), ...args));
  };
}

let _wrapped: (...args: any[]) => any;

Object.assign(O.prototype, {
  clone: _wrapChainable(clone),
  deepGet: _wrap(deepGet),
  defineProperty: _wrapChainable(defineProperty),
  definePropertyIfUnset: _wrapChainable(definePropertyIfUnset),
  entries: _wrap(entries),
  equals: _wrap(equals),
  flat: _wrapChainable(flat),
  hasKey: (_wrapped = _wrap(hasKey)),
  in: _wrapped,
  hasKeys: _wrap(hasKeys),
  isPlainObject: (_wrapped = _wrap(isPlainObject)),
  isStrict: _wrapped,
  isPlain: _wrapped,
  keys: _wrap(keys),
  omit: _wrapChainable(omit),
  pick: _wrapChainable(pick),
  pull: _wrap(pull),
  values: _wrap(values),
});

export type OInstance<Input extends GenericRecord<PropertyKey> = GenericRecord<PropertyKey>, Value extends GenericRecord = ToObject<Input>> = O<Input, Value>

function o<const Input extends GenericRecord<PropertyKey>>(value: Input): O<Input> {
  return new O(value);
}

const WrappedO = new Proxy(OWithMethods as typeof OWithMethods & typeof toObject, {
  apply(_target, _thisArgument, argumentsList) {
    return toObject(...argumentsList);
  },
});

export { WrappedO as O, o };

export type { PropertyDescriptorType } from "./methods/defineProperty";
export type { Mapped, Omitted, OmittedMapped } from "./methods/omit";
export type { Picked } from "./methods/pick";
export type { ToObject } from "./methods/toObject";
export type { DeepValues, GenericRecord, GetDeepValues, HasKeysOptions, WithKeys, Writable, WritableRecursive } from "./types";
