import type {
  DeepEndKeys,
  DeepGet,
  DeepGetFunction,
  Entries,
  GetValueFromDotNotation,
  HasKeysOptions,
  Keys,
  ObjectWithProperty,
  Omitted,
  Picked,
  ToObject,
  Values,
  WithKeys,
} from "~/objects/types";

export function toObject<T>(obj: T): ToObject<T> {
  return Array.isArray(obj) ? Object.assign({}, obj) : Object(obj);
}

export function isObject(
  obj: any,
  allowArray: false
): obj is Record<string, unknown>;
export function isObject(
  obj: any,
  allowArray?: true
): obj is Record<string, unknown> | unknown[];
export function isObject(obj: any, allowArray?: boolean): boolean {
  return (
    !!obj && typeof obj === "object" && (allowArray || !Array.isArray(obj))
  );
}

export function isStrictObject(obj: any): obj is Record<string, unknown> {
  return !!obj && obj.constructor === Object;
}

export function keys<T extends Object>(obj: T | null | undefined): Keys<T> {
  if (!obj) return [] as any;
  if (Array.isArray(obj)) {
    return Array.from(obj.keys()) as any;
  }
  return Object.keys(obj) as any;
}

export function values<T extends Object | any[] | null | undefined>(
  obj: T
): Values<T> {
  if (!obj) return [] as any;
  if (Array.isArray(obj)) {
    return obj as any;
  }
  return Object.values(obj) as any;
}

export function entries<T extends Object | any[] | null | undefined>(
  obj: T
): Entries<T> {
  if (!obj) return [] as any;
  if (Array.isArray(obj)) {
    return Array.from(obj.entries()) as any;
  }
  return Object.entries(obj) as any;
}

// TODO: Improve type guards for this method if someday TypeScript adds supports for multiple assertions.
export function equals<T extends unknown>(obj1: T, obj2: T): obj1 is T {
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
      if (!equals(obj1[i], obj2[i])) {
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

  const keys1 = keys(obj1);
  const keys2 = keys(obj2);

  if (keys1.length !== keys2.length) return false;

  for (const key of keys1) {
    if (!equals((obj1 as any)[key], (obj2 as any)[key])) {
      return false;
    }
  }

  return true;
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
export const deepGet: DeepGetFunction = function deepGet<
  T,
  K extends PropertyKey[]
>(obj: T, ...keys: K): DeepGet<T, K> {
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

export function flat<
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

  for (const [key, value] of entries(obj)) {
    const keys = [..._keys, key];

    if (isStrictObject(value)) {
      flat(value, separator, keys, _accumulator);
    } else {
      _accumulator[makeKey(keys)] = value;
    }
  }

  return _accumulator;
}

export function clone<T extends unknown>(
  obj: T,
  cloneArrays: boolean = true
): T {
  if (!obj) return obj;

  // Clone or copy arrays depending on the value of `cloneArrays`.
  if (Array.isArray(obj)) {
    if (!cloneArrays) {
      return obj as T;
    }

    const c = [] as any[];

    for (const value of obj) {
      c.push(clone(value, cloneArrays));
    }

    return c as T;
  }

  // Primitives and class instances are cloned by reference.
  if (!isStrictObject(obj)) {
    return obj as T;
  }

  // Default logic for objects.
  const c = {} as Record<string, unknown>;

  for (const [key, value] of entries(obj)) {
    c[key] = clone(value as any, cloneArrays);
  }

  return c as T;
}

export function hasKey<K extends PropertyKey, T>(
  key: K,
  obj: T
): obj is (T & object) & {
  [P in K]: P extends keyof T ? T[P] : unknown;
} {
  return !!obj && isObject(obj) && key in (obj as typeof obj & object);
}

export function hasKeys<
  T extends object,
  O extends PropertyKey[] | HasKeysOptions | undefined = undefined
>(obj: T, options?: O): obj is T & WithKeys<O> {
  if (!isObject(obj, true)) return false;

  const {
    symbols = false,
    keys = false,
    onlyEnumerable = true,
  } = Array.isArray(options) ? { keys: options } : options ?? {};

  if (!keys) {
    if (Array.isArray(obj)) return obj.length > 0;

    if (onlyEnumerable) {
      if (Object.keys(obj).length > 0) {
        return true;
      }
    } else if (Object.getOwnPropertyNames(obj).length > 0) {
      return true;
    }

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

export function defineProperty<
  T,
  K extends PropertyKey,
  D extends PropertyDescriptor
>(obj: T, key: K, descriptor: D): ObjectWithProperty<T, K, D> {
  return Object.defineProperty(obj, key, descriptor) as any;
}

export function definePropertyIfUnset<
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

export function groupBy<K extends PropertyKey, T>(
  arr: readonly T[],
  mapper: (arg: T, index: number) => K
): Record<K, T[]>;
export function groupBy<
  Object extends Record<PropertyKey, any>,
  AccessedProperty extends keyof Object
>(
  arr: readonly Object[],
  key: AccessedProperty
): {
  [MappingValue in Object[AccessedProperty]]: Extract<
    Object,
    { [Key in AccessedProperty]: MappingValue }
  >[];
};
export function groupBy(
  arr: readonly unknown[],
  keyOrMapper: PropertyKey | ((arg: unknown, index: number) => PropertyKey)
): Record<PropertyKey, unknown[]> {
  const output = {} as Record<PropertyKey, unknown[]>;
  let i = 0;

  if (typeof keyOrMapper === "function") {
    for (const val of arr) {
      const key = keyOrMapper(val, i++);

      if (!output[key]) output[key] = [];

      output[key].push(val);
    }

    return output;
  }

  for (const val of arr) {
    const key = (val as any)?.[keyOrMapper];

    if (!output[key]) output[key] = [];

    output[key].push(val);
  }

  return output;
}

export function pick<
  T extends Record<PropertyKey, any>,
  K extends keyof T,
  C extends ((key: K, value: T[keyof T]) => any) | undefined = undefined
>(obj: T, keys: readonly K[], callback?: C): Picked<T, K, C> {
  const output = {} as Picked<T, K, C>;

  if (typeof callback === "function")
    for (const key of keys) {
      output[key] = callback(key, obj[key]);
    }
  else
    for (const key of keys) {
      output[key] = obj[key] as any;
    }

  return output;
}

export function omit<
  T extends object,
  K extends keyof T,
  C extends ((key: K, value: T[keyof T]) => any) | undefined = undefined
>(obj: T, keys: readonly K[], callback?: C): Omitted<T, K, C> {
  const output = {} as Omitted<T, K, C>,
    keySet = new Set(keys);

  if (typeof callback === "function") {
    for (const key in obj) {
      if (!keySet.has(key as any)) {
        // @ts-expect-error
        output[key] = callback(key, obj[key]);
      }
    }
  } else {
    for (const key in obj) {
      if (!keySet.has(key as any)) {
        // @ts-expect-error
        output[key] = obj[key];
      }
    }
  }

  return output;
}
