// This file is generated. Do not edit it directly.

import type { IfNever } from "./../utils/types";
import type { PropertyDescriptorType } from "./methods/defineProperty";
import type { Flat } from "./methods/flat";
import type { Merge } from "./methods/merge";
import type { Mapped, Omitted, OmittedMapped } from "./methods/omit";
import type { Picked } from "./methods/pick";
import type { ToObject } from "./methods/toObject";
import type { DeepValues, GenericRecord, HasKeysOptions, WithKeys, Writable } from "./types";

import { assignMethods } from "../utils/assignMethods";
import { clone } from "./methods/clone";
import { deepGet } from "./methods/deepGet";
import { defineProperty } from "./methods/defineProperty";
import { definePropertyIfUnset } from "./methods/definePropertyIfUnset";
import { entries } from "./methods/entries";
import { equals } from "./methods/equals";
import { flat } from "./methods/flat";
import { freeze } from "./methods/freeze";
import { groupBy } from "./methods/groupBy";
import { hasKey } from "./methods/hasKey";
import { hasKeys } from "./methods/hasKeys";
import { isNotObject } from "./methods/isNotObject";
import { isObject } from "./methods/isObject";
import { isPlainObject } from "./methods/isPlainObject";
import { keys } from "./methods/keys";
import { merge } from "./methods/merge";
import { omit } from "./methods/omit";
import { pick } from "./methods/pick";
import { pull } from "./methods/pull";
import { seal } from "./methods/seal";
import { toObject } from "./methods/toObject";
import { values } from "./methods/values";

type DotPaths<T, D extends number = 6> = [D] extends [never]
  ? never
  : T extends object
    ? {
        [K in Extract<keyof T, string>]: T[K] extends object
          ? `${K}` | `${K}.${DotPaths<T[K], Prev[D]>}`
          : `${K}`;
      }[Extract<keyof T, string>]
    : never;

type DeepValue<T, P extends string> = P extends `${infer K}.${infer Rest}`
  ? K extends keyof T
    ? DeepValue<T[K], Rest>
    : never
  : P extends keyof T
    ? T[P]
    : never;

type Prev = [never, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

class O<
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

  toObject(): Value {
    return this.value;
  }
}

interface O<Input extends GenericRecord<PropertyKey>, Value extends GenericRecord = ToObject<Input>> {
  /**
   * Clones an object deeply. Class instances are copied by reference.
   *
   * The second argument is a boolean whether to clone arrays as well.
   * If `false`, arrays will be copied by reference. If `true` (default), arrays will be cloned deeply as well.
   */
  clone(cloneArrays?: boolean): O<Value>;

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
  deepGet(): Value;
  deepGet<K extends DotPaths<Value>>(key: K): DeepValue<Value, K>;
  deepGet<K1 extends keyof Value>(k1: K1): Value[K1];
  deepGet<K1 extends keyof Value, K2 extends keyof Value[K1]>(k1: K1, k2: K2): Value[K1][K2];
  deepGet<K1 extends keyof Value, K2 extends keyof Value[K1], K3 extends keyof Value[K1][K2]>(k1: K1, k2: K2, k3: K3): Value[K1][K2][K3];
  deepGet<K1 extends keyof Value, K2 extends keyof Value[K1], K3 extends keyof Value[K1][K2], K4 extends keyof Value[K1][K2][K3]>(k1: K1, k2: K2, k3: K3, k4: K4): Value[K1][K2][K3][K4];
  deepGet<K1 extends keyof Value, K2 extends keyof Value[K1], K3 extends keyof Value[K1][K2], K4 extends keyof Value[K1][K2][K3], K5 extends keyof Value[K1][K2][K3][K4]>(k1: K1, k2: K2, k3: K3, k4: K4, k5: K5): Value[K1][K2][K3][K4][K5];
  deepGet<K1 extends keyof Value, K2 extends keyof Value[K1], K3 extends keyof Value[K1][K2], K4 extends keyof Value[K1][K2][K3], K5 extends keyof Value[K1][K2][K3][K4], K6 extends keyof Value[K1][K2][K3][K4][K5]>(k1: K1, k2: K2, k3: K3, k4: K4, k5: K5, k6: K6): Value[K1][K2][K3][K4][K5][K6];
  deepGet(parts: PropertyKey[]): unknown;
  deepGet(...parts: PropertyKey[]): unknown;

  defineProperty<K extends PropertyKey, V extends PropertyDescriptor>(key: K, descriptor: V): O<Value & { [P in K]: PropertyDescriptorType<V> }>;

  /**
   * Defines a property on an object, only if it doesn't exist yet.
   */
  definePropertyIfUnset<K extends PropertyKey, V extends PropertyDescriptor>(key: K, value: V): O<Value & { [P in K]: P extends keyof Value ? Value[P] : PropertyDescriptorType<V> }>;

  /**
   * Returns exactly the same as Object.entries(), but strongly types the return value.
   */
  entries(): [string, unknown][];
  entries<T>(): [number, T][];
  entries(): {
  [K in keyof Value]: [K, Value[K]];
}[keyof Value][];

  /**
   * Compares two objects for equality, using Object.is() for non-objects and deep comparison of properties for objects and arrays.
   *
   * TODO: Improve type guards for this method if someday TypeScript adds supports for multiple assertions.
   */
  equals(obj2: unknown): obj2 is Value;

  /**
   * Deeply flattens an object.
   * Returns a new object where all properties are at the root level, with the keys using dot notation by default.
   *
   * A separator might be provided to use a different notation.
   * It may either be a string in which case it'll be used to join the keys, or a function that takes the keys as arguments and returns a string, number or symbol.
   */
  flat(): O<Flat<Value, ".">>;
  flat<S extends string>(separator: S): O<Flat<Value, S>>;
  flat<K extends PropertyKey>(keyFn: (keys: PropertyKey[]) => K | undefined): O<Record<K, DeepValues<Value>>>;
  flat(separator?: string | ((k: PropertyKey[]) => PropertyKey | undefined), keys?: PropertyKey[], accumulator?: GenericRecord): O<GenericRecord>;



  /**
   * Returns a boolean whether the given key is present in the given object. Equivalent to `key in obj`.
   * If you need to check for multiple keys, use `O.hasKeys()` instead.
   */
  hasKey<const K extends PropertyKey>(key: K): this is Value & {
  [P in K]: P extends keyof Value ? Value[P] : unknown;
};

  /** @alias O.hasKey */
  in<const K extends PropertyKey>(key: K): this is Value & {
  [P in K]: P extends keyof Value ? Value[P] : unknown;
};

  /**
   * Checks whether an object has keys.
   * Allows to pass an array of keys to check for; if absent, checks for any own property.
   * Passing something that isn't an Object as the first argument will return false.
   */
  hasKeys<const O extends readonly PropertyKey[] | HasKeysOptions | undefined =
    undefined>(options?: O): this is Value & WithKeys<O>;
  hasKeys<const O extends readonly PropertyKey[] | HasKeysOptions | undefined =
    undefined>(options?: O): this is Value;

  /**
   * Returns a boolean whether the given input is an object.
   *
   * Returns `false` for `null`, class instances, functions, arrays and all primitive types.
   */
  isPlainObject(): this is GenericRecord;

  /** @alias O.isPlainObject */
  isStrict(): this is GenericRecord;

  /** @alias O.isPlainObject */
  isPlain(): this is GenericRecord;

  keys(): IfNever<keyof Value, string[], (keyof Value & (string | number))[]>;
  keys(): (string | number)[];
  keys(): number[];

  merge<const U extends GenericRecord[]>(...sources: U): O<Merge<[Value, ...U]>>;
  merge(): O<GenericRecord>;

  /**
   * Returns a new object with the same properties as the input object except for the ones that are present in the `omit` array.
   * Passing an empty array will return a shallow copy of the input object.
   */
  omit<K extends keyof Value>(keys: readonly K[]): O<Omitted<Value, K>>;
  omit<K extends keyof Value>(predicate: (key: K, value: Value[K], obj: Value) => boolean): O<Partial<Writable<Value>>>;
  omit<K extends keyof Value, C extends (key: keyof Value, value: Value[keyof Value]) => any>(keys: readonly K[], callback: C): O<OmittedMapped<Value, K, C>>;
  omit<K extends keyof Value, C extends (key: keyof Value, value: Value[keyof Value]) => any>(predicate: (key: K, value: Value[K], obj: Value) => boolean, transform: C): O<Partial<Mapped<Value, C>>>;

  /**
   * Picks a subset of properties from an object. Missing properties are ignored.
   * Missing properties are included as `undefined` in the result.
   */
  pick<K extends keyof Value, C extends ((key: K, value: Value[keyof Value]) => any) | undefined = undefined>(keys: readonly K[], callback?: C): O<Picked<Value, K, C>>;

  /**
   * Returns an object with the provided properties pulled out of the input object.
   * The properties are removed from the input object.
   *
   * If you want to get a subset of properties without touching the input object, use `O.pick()` instead.
   */
  pull<K extends keyof Value | readonly (keyof Value | PropertyKey)[]>(keyOrKeys: K): K extends readonly PropertyKey[]
  ? Pick<Value, K[number] & keyof Value>
  : K extends keyof Value
    ? Value[K]
    : never;



  /**
   * Returns exactly the same as Object.values(), but strongly types the return value.
   */
  values(): Value[keyof Value][];
  values(): unknown[];
}

const staticMethods = {
  /**
   * Groups an array of objects by a key or a function that returns a key.
   * If the key is a function, it'll be called with the object as the first argument and the index as the second.
   */
  groupBy,
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
   * Converts any value to an object.
   * `null` and `undefined` are converted to empty objects.
   * Arrays are converted using `Object.assign()`.
   * Booleans, numbers and strings are converted to objects by being passed to the Object constructor.
   * All other values are returned as-is.
   */
  toObject,
  /** @alias O.toObject */
  from: toObject,
};

const instanceMethods = {
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
   * Returns an object with the provided properties pulled out of the input object.
   * The properties are removed from the input object.
   *
   * If you want to get a subset of properties without touching the input object, use `O.pick()` instead.
   */
  pull,
  /**
   * Returns exactly the same as Object.values(), but strongly types the return value.
   */
  values,
};

const chainableMethods = {
  /**
   * Clones an object deeply. Class instances are copied by reference.
   *
   * The second argument is a boolean whether to clone arrays as well.
   * If `false`, arrays will be copied by reference. If `true` (default), arrays will be cloned deeply as well.
   */
  clone,
  defineProperty,
  /**
   * Defines a property on an object, only if it doesn't exist yet.
   */
  definePropertyIfUnset,
  /**
   * Deeply flattens an object.
   * Returns a new object where all properties are at the root level, with the keys using dot notation by default.
   *
   * A separator might be provided to use a different notation.
   * It may either be a string in which case it'll be used to join the keys, or a function that takes the keys as arguments and returns a string, number or symbol.
   */
  flat,
  freeze,
  merge,
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
  seal,
};

assignMethods(O, instanceMethods, false);
assignMethods(O, chainableMethods, true);

const OWithMethods = Object.assign(O, staticMethods, instanceMethods, chainableMethods);

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
export type { Flat, Flatten } from "./methods/flat";
export type { Merge } from "./methods/merge";
export type { Mapped, Omitted, OmittedMapped } from "./methods/omit";
export type { Picked } from "./methods/pick";
export type { ToObject } from "./methods/toObject";
export type { DeepValues, GenericRecord, GetDeepValues, HasKeysOptions, WithKeys, Writable, WritableRecursive } from "./types";
