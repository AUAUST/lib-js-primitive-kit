/**
 * A type function that returns the keys of an object as a string literal type.
 */
type TStringKeys<T> = keyof T extends infer K
  ? K extends string | number
    ? `${K}`
    : never
  : never;

/**
 * A type function that returns the values of an object as a union type.
 */
type TValues<T> = T[keyof T];

type TPickByValue<T, V> = Pick<
  T,
  { [K in keyof T]: T[K] extends V ? K : never }[keyof T]
>;

/**
 * A type function that returns the entries of an object as a tuple type.
 */
type TEntries<T> = {
  [K in keyof T]: [keyof TPickByValue<T, T[K]>, T[K]];
}[keyof T][];

/**
 * The O class, for Object, provides useful methods for working with objects.
 */
class O extends Object {
  /**
   * Converts any value to an object.
   * `null` and `undefined` are converted to empty objects.
   * Arrays are converted using `Object.assign()`.
   * Booleans, numbers and strings are converted to objects by being passed to the Object constructor.
   * All other values are returned as-is.
   */
  static from(obj: any): object {
    if (obj === null || obj === undefined) {
      return {};
    }

    if (Array.isArray(obj)) {
      return Object.assign({}, obj);
    }

    if (
      typeof obj === "boolean" ||
      typeof obj === "number" ||
      typeof obj === "string"
    ) {
      return new Object(obj);
    }

    return obj;
  }

  /**
   * Simple is-object check, to avoid repeating `typeof` and `!== null`.
   *
   * Returns `false` for `null` and other non-object values.
   * Returns `true` class instances.
   * Returns `false` for functions.
   * Returns `true` or `false` for arrays depending on the value of `allowArray`.
   */
  static is(obj: any, allowArray?: false): obj is object;
  static is(obj: any, allowArray?: true): obj is object | any[];
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
  static isStrict(obj: any): obj is Object {
    return !!obj && obj.constructor === Object;
  }

  /**
   * Returns exactly the same as Object.keys(), but strongly types the return value.
   */
  static keys<T extends Object>(obj: T) {
    return Object.keys(obj) as TStringKeys<T>[];
  }

  /**
   * Returns exactly the same as Object.values(), but strongly types the return value.
   */
  static values<T extends Object>(obj: T) {
    return Object.values(obj) as TValues<T>[];
  }

  /**
   * Returns exactly the same as Object.entries(), but strongly types the return value.
   */
  static entries<T extends Object>(obj: T) {
    return Object.entries(obj) as TEntries<T>;
  }

  /**
   * Compares two objects for equality, using Object.is() for non-objects and deep comparison of properties for objects and arrays.
   *
   * TODO: Improve type guards for this method if someday TypeScript adds supports for multiple assertions.
   */
  static equals<T extends unknown>(obj1: T, obj2: T): obj1 is T {
    // Will return true for equal primitives, NaN and objects that are the same instance.
    if (Object.is(obj1, obj2)) return true;

    // Ensures the following typeof === "object" won't false-positive for null.
    if (obj1 === null || obj2 === null) {
      return false;
    }

    // If the values aren't objects and failed the Object.is() check, they aren't equal.
    if (typeof obj1 !== "object" || typeof obj2 !== "object") {
      return false;
    }

    // Two objects that aren't sharing the same prototype aren't equal.
    if (obj1.constructor !== obj2.constructor) {
      return false;
    }

    if (Array.isArray(obj1) && Array.isArray(obj2)) {
      if (obj1.length !== obj2.length) {
        return false;
      }

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
      if (!O.equals(obj1[key], obj2[key])) {
        return false;
      }
    }

    return true;
  }
}

export { O };
