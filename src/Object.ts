import type {
  DeepEndKeys,
  DeepGet,
  DeepGetFunction,
  Entries,
  GetValueFromDotNotation,
  HasKeysOptions,
  Keys,
  ObjectWithProperty,
  ToObject,
  Values,
  WithKeys,
} from "~/types/Object";

// That mess is required to make TS happy.
// Those are the keys which `O`'s implementation signature don't extend `Object`.
// It's used to make TypeScript happy by excluding them from the `Object` type.
type Diff = "keys" | "values" | "entries";
const Obj = Object as Omit<typeof Object, Diff> & (new () => Object);

/**
 *
 * The O class, for Object, provides useful methods for working with objects.
 */
class O extends Obj {
  /**
   * Converts any value to an object.
   * `null` and `undefined` are converted to empty objects.
   * Arrays are converted using `Object.assign()`.
   * Booleans, numbers and strings are converted to objects by being passed to the Object constructor.
   * All other values are returned as-is.
   */
  static from<T>(obj: T): ToObject<T> {
    if (obj === null || obj === undefined) {
      return {} as any;
    }

    if (Array.isArray(obj)) {
      return Object.assign({}, obj) as any;
    }

    const tO = typeof obj;
    if (tO === "boolean" || tO === "number" || tO === "string") {
      return new Object(obj) as any;
    }

    return obj as any;
  }

  /**
   * Simple is-object check, to avoid repeating `typeof x === "object" && x !== null`.
   *
   * Returns `false` for `null` and other primitive values.
   * Returns `false` for functions.
   * Returns `true` class instances.
   * Returns `true` or `false` for arrays depending on the value of `allowArray`.
   */
  static is(obj: any, allowArray: false): obj is Record<string, unknown>;
  static is(
    obj: any,
    allowArray?: true
  ): obj is Record<string, unknown> | unknown[];
  static is(obj: any, allowArray?: boolean): boolean {
    return (
      !!obj && typeof obj === "object" && (allowArray || !Array.isArray(obj))
    );
  }

  /**
   * Returns a boolean whether the given input is an object.
   *
   * Returns `false` for `null`, class instances, functions, arrays and all primitive types.
   */
  static isStrict(obj: any): obj is Record<string, unknown> {
    return !!obj && obj.constructor === Object;
  }

  /**
   * Returns exactly the same as Object.keys(), but strongly types the return value.
   */
  static keys<T extends Object>(obj: T | null | undefined): Keys<T> {
    if (!obj) return [] as any;
    if (Array.isArray(obj)) {
      return Array.from(obj.keys()) as any;
    }
    return Object.keys(obj) as any;
  }

  /**
   * Returns exactly the same as Object.values(), but strongly types the return value.
   */
  static values<T extends Object | any[] | null | undefined>(
    obj: T
  ): Values<T> {
    if (!obj) return [] as any;
    if (Array.isArray(obj)) {
      return obj as any;
    }
    return Object.values(obj) as any;
  }

  /**
   * Returns exactly the same as Object.entries(), but strongly types the return value.
   */
  static entries<T extends Object | any[] | null | undefined>(
    obj: T
  ): Entries<T> {
    if (!obj) return [] as any;
    if (Array.isArray(obj)) {
      return Array.from(obj.entries()) as any;
    }
    return Object.entries(obj) as any;
  }

  /**
   * Compares two objects for equality, using Object.is() for non-objects and deep comparison of properties for objects and arrays.
   *
   * TODO: Improve type guards for this method if someday TypeScript adds supports for multiple assertions.
   */
  static equals<T extends unknown>(obj1: T, obj2: T): obj1 is T {
    // Will return true for equal primitives, NaN and objects that are the same instance.
    if (Object.is(obj1, obj2)) return true;

    // If the values aren't objects and failed the Object.is() check, they aren't equal.
    if (typeof obj1 !== "object" || typeof obj2 !== "object") return false;

    // Ensures the typeof === "object" didn't false-positive for null.
    // If both were null, they would have been equal using Object.is() already so it's safe.
    if (obj1 === null || obj2 === null) return false;

    // Two objects that aren't sharing the same prototype aren't equal.
    if (obj1.constructor !== obj2.constructor) return false;

    if (Array.isArray(obj1) && Array.isArray(obj2)) {
      if (obj1.length !== obj2.length) return false;

      for (let i = 0; i < obj1.length; i++) {
        if (!O.equals(obj1[i], obj2[i])) {
          return false;
        }
      }

      return true;
    }

    // Checks equality for class instances.
    if (obj1.constructor !== Object) {
      // The two objects are of the same class, not Object nor Array, and aren't strictly equal.
      // The safest way to compare them is to use their toString() methods.
      const string1 = obj1.toString();
      const string2 = obj2.toString();

      // If the toString() methods returns a string matching [object ClassName], we return false.
      // This is because it means the class doesn't implement its own toString() method, thus doesn't share any information about its properties nor held values.
      if (string1 === string2) {
        if (/\[object \w+\]/.test(string1)) {
          return false;
        }

        return true;
      }

      return false;
    }

    const keys1 = O.keys(obj1);
    const keys2 = O.keys(obj2);

    if (keys1.length !== keys2.length) return false;

    for (const key of keys1) {
      if (!O.equals((obj1 as any)[key], (obj2 as any)[key])) {
        return false;
      }
    }

    return true;
  }

  /**
   * Returns a boolean whether the given key is present in the given object.
   * Type-safe version of `key in obj`.
   *
   * If the key is an array, it'll check whether all keys are present, and type guard for each of them.
   */
  static in<K extends PropertyKey | Readonly<PropertyKey[]>, T extends object>(
    key: K,
    obj: T
  ): obj is T &
    (K extends Readonly<PropertyKey[]>
      ? {
          [P in K[number]]: unknown;
        }
      : K extends PropertyKey
      ? {
          [P in K]: unknown;
        }
      : never) {
    return Array.isArray(key)
      ? key.every((k) => k in obj)
      : (key as PropertyKey) in obj;
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
  static deepGet: DeepGetFunction = function <T, K extends PropertyKey[]>(
    obj: T,
    ...keys: K
  ): DeepGet<T, K> {
    if (keys.length === 0) {
      return obj as DeepGet<T, K>;
    }

    if (keys.length === 1) {
      keys = (keys[0] as string).split(".") as K;
    }

    if (keys.length === 2 && !["string", "number"].includes(typeof keys[1])) {
      keys.pop();
    }

    let value = obj;

    for (const key of keys) {
      value = (value as any)?.[key];

      if (value === undefined) {
        return undefined as DeepGet<T, K>;
      }
    }

    return value as DeepGet<T, K>;
  };

  /**
   * Deeply flattens an object.
   * Returns a new object where all properties are at the root level, with the keys using dot notation by default.
   *
   * A separator might be provided to use a different notation.
   * It may either be a string in which case it'll be used to join the keys, or a function that takes the keys as arguments and returns a string, number or symbol.
   */
  static flat<
    T extends object,
    S extends string | ((keys: PropertyKey[]) => PropertyKey)
  >(
    obj: T,
    separator?: S,
    _keys: PropertyKey[] = [],
    _accumulator: any = {}
  ): {
    [K in DeepEndKeys<T, S>]: GetValueFromDotNotation<T, K, S>;
  } {
    const makeKey: (keys: PropertyKey[]) => PropertyKey = (() => {
      if (typeof separator === "function") {
        return (...args) => {
          const key = (separator as (keys: PropertyKey[]) => PropertyKey)(
            ...args
          );

          // Ensures the custom function returns a valid key.
          if (!["string", "symbol", "number"].includes(typeof key)) {
            throw new TypeError(
              `Invalid key ${String(
                key
              )} of type ${typeof key} returned by separator function.`
            );
          }

          return key;
        };
      }

      separator = String(separator ?? ".") as S;

      return (keys: PropertyKey[]) => keys.join(separator as string);
    })();

    for (const [key, value] of O.entries(obj)) {
      const keys = [..._keys, key];

      if (O.isStrict(value)) {
        O.flat(value, separator, keys, _accumulator);
      } else {
        _accumulator[makeKey(keys)] = value;
      }
    }

    return _accumulator;
  }

  /**
   * Clones an object deeply. Class instances are copied by reference.
   *
   * The second argument is boolean whether to clone arrays as well.
   * If `false`, arrays will be copied by reference. If `true` (default), arrays will be cloned deeply as well.
   */
  static clone<T extends unknown>(obj: T, cloneArrays: boolean = true): T {
    if (!obj) return obj;

    // Clone or copy arrays depending on the value of `cloneArrays`.
    if (Array.isArray(obj)) {
      if (!cloneArrays) {
        return obj as T;
      }

      const clone = [] as any[];

      for (const value of obj) {
        clone.push(O.clone(value, cloneArrays));
      }

      return clone as T;
    }

    // Primitives and class instances are cloned by reference.
    if (!O.isStrict(obj)) {
      return obj as T;
    }

    // Default logic for objects.
    const clone = {} as Record<string, unknown>;

    for (const [key, value] of O.entries(obj)) {
      clone[key] = O.clone(value as any, cloneArrays);
    }

    return clone as T;
  }

  /**
   * Checks whether an object has keys.
   * Allows to pass an array of keys to check for; if absent, checks for any own property.
   * Passing something that isn't an Object as the first argument will return false.
   */
  static hasKeys<
    T extends object,
    O extends PropertyKey[] | HasKeysOptions | undefined = undefined
  >(obj: T, options?: O): obj is T & WithKeys<O> {
    if (!(O.isStrict(obj) || Array.isArray(obj))) return false;

    const {
      symbols = false,
      keys = false,
      onlyEnumerable = true,
    } = Array.isArray(options) ? { keys: options } : options ?? {};

    // Check without a list of keys.
    if (!keys) {
      // Check for string keys based on the enumerable option.
      if (onlyEnumerable) {
        if (Object.keys(obj).length > 0) {
          return true;
        }
      } else {
        if (Object.getOwnPropertyNames(obj).length > 0) {
          return true;
        }
      }

      // At this point, if the object had any string keys it's already returned true.
      // We only need to check for symbols if the symbols option is true, or return false.
      if (symbols && Object.getOwnPropertySymbols(obj).length > 0) {
        return true;
      }

      return false;
    }

    // If a list of keys is provided, we check for each of them.
    for (const key of keys) {
      if (!obj.hasOwnProperty(key)) {
        return false;
      }
    }

    return true;
  }

  /**
   * @borrows Object.defineProperty as defineProperty
   */
  static defineProperty<T, K extends PropertyKey, D extends PropertyDescriptor>(
    obj: T,
    key: K,
    descriptor: D
  ): ObjectWithProperty<T, K, D> {
    return Object.defineProperty(obj, key, descriptor) as any;
  }

  /**
   * Defines a property on an object, only if it doesn't exist yet.
   */
  static definePropertyIfUnset<
    T,
    K extends PropertyKey,
    D extends PropertyDescriptor
  >(
    obj: T,
    key: K,
    descriptor: D
  ): K extends keyof T ? T : ObjectWithProperty<T, K, D> {
    if (obj?.hasOwnProperty(key)) return obj as any;
    return Object.defineProperty(obj, key, descriptor) as any;
  }
}

const WrappedO = new Proxy(
  // The proxy makes it callable, using the `from()` method.
  O as typeof O & {
    (input: any): object;
  },
  {
    apply(target, _, argumentsList) {
      // @ts-ignore
      return target.from(...argumentsList);
    },
  }
);

export { WrappedO as O };
