// This file is generated. Do not edit it directly.

import type { IfNever, UnionToIntersection } from "./../utils/types";
import type { PropertyDescriptorType } from "./methods/defineProperty";
import type { Mapped, Omitted, OmittedMapped } from "./methods/omit";
import type { Picked } from "./methods/pick";
import type { ToObject } from "./methods/toObject";
import type { DeepValues, GenericRecord, HasKeysOptions, WithKeys, Writable } from "./types";

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

type Flat<T, S extends string> = IfNever<
  keyof T,
  T,
  Merge<UnionToIntersection<Flatten<T, S>>>
>;

type Merge<T> = {
  [K in keyof T]: T[K];
};

type Flatten<T, S extends string, P extends string = ""> =
  // Avoids infinite recursion when the object keys are generic
  PropertyKey extends keyof T
    ? GenericRecord
    : {
        [K in keyof T]: T[K] extends GenericRecord
          ? Flatten<T[K], S, `${P}${K & string}${S}`>
          : {
              [Key in `${P}${K & string}`]: T[K];
            };
      }[keyof T];

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

  /**
   * Clones an object deeply. Class instances are copied by reference.
   *
   * The second argument is a boolean whether to clone arrays as well.
   * If `false`, arrays will be copied by reference. If `true` (default), arrays will be cloned deeply as well.
   */
  clone(cloneArrays?: boolean): O<Value>;
  clone(...args: any[]): any {
    // @ts-ignore
    return new O(clone(this.valueOf(), ...args));
  }

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
  deepGet(...args: any[]): any {
    // @ts-ignore
    return deepGet(this.valueOf(), ...args);
  }

  defineProperty<K extends PropertyKey, V extends PropertyDescriptor>(key: K, descriptor: V): O<Value & { [P in K]: PropertyDescriptorType<V> }>;
  defineProperty(...args: any[]): any {
    // @ts-ignore
    return new O(defineProperty(this.valueOf(), ...args));
  }

  /**
   * Defines a property on an object, only if it doesn't exist yet.
   */
  definePropertyIfUnset<K extends PropertyKey, V extends PropertyDescriptor>(key: K, value: V): O<Value & { [P in K]: P extends keyof Value ? Value[P] : PropertyDescriptorType<V> }>;
  definePropertyIfUnset(...args: any[]): any {
    // @ts-ignore
    return new O(definePropertyIfUnset(this.valueOf(), ...args));
  }

  /**
   * Returns exactly the same as Object.entries(), but strongly types the return value.
   */
  entries(): [string, unknown][];
  entries<T>(): [number, T][];
  entries(): {
  [K in keyof Value]: [K, Value[K]];
}[keyof Value][];
  entries(...args: any[]): any {
    // @ts-ignore
    return entries(this.valueOf(), ...args);
  }

  /**
   * Compares two objects for equality, using Object.is() for non-objects and deep comparison of properties for objects and arrays.
   *
   * TODO: Improve type guards for this method if someday TypeScript adds supports for multiple assertions.
   */
  equals(obj2: unknown): obj2 is Value;
  equals(...args: any[]): any {
    // @ts-ignore
    return equals(this.valueOf(), ...args);
  }

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
  flat(...args: any[]): any {
    // @ts-ignore
    return new O(flat(this.valueOf(), ...args));
  }

  /**
   * Returns a boolean whether the given key is present in the given object. Equivalent to `key in obj`.
   * If you need to check for multiple keys, use `O.hasKeys()` instead.
   */
  hasKey<const K extends PropertyKey>(key: K): this is Value & {
  [P in K]: P extends keyof Value ? Value[P] : unknown;
};
  hasKey(...args: any[]): any {
    // @ts-ignore
    return hasKey(this.valueOf(), ...args);
  }

  /** @alias O.hasKey */
  in = this.hasKey;

  /**
   * Checks whether an object has keys.
   * Allows to pass an array of keys to check for; if absent, checks for any own property.
   * Passing something that isn't an Object as the first argument will return false.
   */
  hasKeys<const O extends readonly PropertyKey[] | HasKeysOptions | undefined =
    undefined>(options?: O): this is Value & WithKeys<O>;
  hasKeys<const O extends readonly PropertyKey[] | HasKeysOptions | undefined =
    undefined>(options?: O): this is Value;
  hasKeys(...args: any[]): any {
    // @ts-ignore
    return hasKeys(this.valueOf(), ...args);
  }

  /**
   * Returns a boolean whether the given input is an object.
   *
   * Returns `false` for `null`, class instances, functions, arrays and all primitive types.
   */
  isPlainObject(): this is GenericRecord;
  isPlainObject(...args: any[]): any {
    // @ts-ignore
    return isPlainObject(this.valueOf(), ...args);
  }

  /** @alias O.isPlainObject */
  isStrict = this.isPlainObject;

  /** @alias O.isPlainObject */
  isPlain = this.isPlainObject;

  keys(): IfNever<keyof Value, string[], (keyof Value & (string | number))[]>;
  keys(): (string | number)[];
  keys(): number[];
  keys(...args: any[]): any {
    // @ts-ignore
    return keys(this.valueOf(), ...args);
  }

  /**
   * Returns a new object with the same properties as the input object except for the ones that are present in the `omit` array.
   * Passing an empty array will return a shallow copy of the input object.
   */
  omit<K extends keyof Value>(keys: readonly K[]): O<Omitted<Value, K>>;
  omit<K extends keyof Value>(predicate: (key: K, value: Value[K], obj: Value) => boolean): O<Partial<Writable<Value>>>;
  omit<K extends keyof Value, C extends (key: keyof Value, value: Value[keyof Value]) => any>(keys: readonly K[], callback: C): O<OmittedMapped<Value, K, C>>;
  omit<K extends keyof Value, C extends (key: keyof Value, value: Value[keyof Value]) => any>(predicate: (key: K, value: Value[K], obj: Value) => boolean, transform: C): O<Partial<Mapped<Value, C>>>;
  omit(...args: any[]): any {
    // @ts-ignore
    return new O(omit(this.valueOf(), ...args));
  }

  /**
   * Picks a subset of properties from an object. Missing properties are ignored.
   * Missing properties are included as `undefined` in the result.
   */
  pick<K extends keyof Value, C extends ((key: K, value: Value[keyof Value]) => any) | undefined = undefined>(keys: readonly K[], callback?: C): O<Picked<Value, K, C>>;
  pick(...args: any[]): any {
    // @ts-ignore
    return new O(pick(this.valueOf(), ...args));
  }

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
  pull(...args: any[]): any {
    // @ts-ignore
    return pull(this.valueOf(), ...args);
  }

  /**
   * Returns exactly the same as Object.values(), but strongly types the return value.
   */
  values(): Value[keyof Value][];
  values(): unknown[];
  values(...args: any[]): any {
    // @ts-ignore
    return values(this.valueOf(), ...args);
  }
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
