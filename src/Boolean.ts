import { Booleanifiable } from "./types/Boolean";

/**
 * The B class, for Boolean, provides useful methods for working with booleans.
 *
 * Warning: All methods in this class have the option to convert their input to a boolean using `B.from()`.
 * This is usually done by passing a truthy value to the last argument of the method.
 */
class B extends Boolean {
  /** @internal */
  private static toBoolean(value: any, useFrom: boolean = false): boolean {
    return useFrom ? B.from(value) : Boolean(value);
  }

  /**
   * Converts any value to a boolean.
   *
   * Object versions of primitives are converted according to their primitive value.
   * String `false`, `0` and strings composed of only whitespace are converted to `false` (case-insensitive), every other string is converted to `true`.
   *
   * Everything else is converted using `Boolean()`.
   *
   * @example ```ts
   * B.from(new String("")) // `false` instead of `true` in the original Boolean()
   * B.from(new Number(0)) // `false` instead of `true` in the original Boolean()
   * B.from(new Boolean(false)) // `false` instead of `true` in the original Boolean()
   *
   * B.from("") // `false`
   * B.from(0) // `false`
   * B.from(false) // `false`
   * B.from("false") // `false`
   * B.from("0") // `false`
   * B.from(" \r\n") // `false`
   * B.from(null) // `false`
   * B.from(undefined) // `false`
   * B.from(NaN) // `false`
   *
   * B.from("foo") // `true`
   * B.from(1) // `true`
   * B.from({}) // `true`
   * B.from([]) // `true`
   * ```
   */
  static from(bool: any): boolean {
    if (
      bool instanceof String ||
      bool instanceof Number ||
      bool instanceof Boolean
    ) {
      bool = bool.valueOf();
    }

    if (typeof bool === "string") {
      bool = bool.trim();

      if (bool.length === 0 || bool.toLowerCase() === "false" || bool === "0") {
        return false;
      }
    }

    return Boolean(bool);
  }

  /**
   * A simple is-boolean check. Shortcut for `typeof x === "boolean"`.
   */
  static is(x: any): x is boolean {
    return typeof x === "boolean";
  }

  /**
   * A loose is-boolean check. Returns `true` for any value that directly represents a boolean.
   * Returns true for booleans.
   * Returns true for strings that case-insensitively match `"true"` or `"false"`.
   * Returns true for numbers that are `0` or `1`.
   * Returns true for objects which `valueOf()` method returns one of the above.
   * Retrns false for any other value.
   */
  static isLoose(x: any): x is Booleanifiable {
    x = x?.valueOf();

    switch (typeof x) {
      case "boolean":
        return true;
      case "string":
        x = x.trim().toLowerCase();
        return x === "true" || x === "false";
      case "number":
        return x === 0 || x === 1;
      default:
        return false;
    }
  }

  /**
   * Compares two boolean after converting them to booleans using `B.from()`.
   */
  static equals(a: any, b: any): boolean {
    return B.from(a) === B.from(b);
  }

  /**
   * The logical AND operator.
   *
   * Returns true if both `a` and `b` are truthy.
   */
  static and(a: any, b: any, useFrom?: boolean): boolean {
    return B.toBoolean(a, useFrom) && B.toBoolean(b, useFrom);
  }

  /**
   * The logical OR operator.
   *
   * Returns true if either `a` or `b` are truthy.
   */
  static or(a: any, b: any, useFrom?: boolean): boolean {
    return B.toBoolean(a, useFrom) || B.toBoolean(b, useFrom);
  }

  /**
   * The logical NOT operator.
   *
   * Returns the opposite of `a` converted to a boolean.
   */
  static not(a: any, useFrom?: boolean): boolean {
    return !B.toBoolean(a, useFrom);
  }

  /**
   * The logical XOR operator.
   *
   * Returns true if either `a` or `b` are truthy, but not both nor neither.
   */
  static xor(a: any, b: any, useFrom?: boolean): boolean {
    return B.toBoolean(a, useFrom) !== B.toBoolean(b, useFrom);
  }

  /**
   * The logical NAND operator.
   *
   * Returns true if either `a` or `b` are falsy.
   */
  static nand(a: any, b: any, useFrom?: boolean): boolean {
    return !B.and(a, b, useFrom);
  }

  /**
   * The logical NOR operator.
   *
   * Returns true if both `a` and `b` are falsy.
   */
  static nor(a: any, b: any, useFrom?: boolean): boolean {
    return !B.or(a, b, useFrom);
  }

  /**
   * The logical XNOR operator.
   *
   * Returns true if either both `a` and `b` are truthy or both are falsy.
   */
  static xnor(a: any, b: any, useFrom?: boolean): boolean {
    return !B.xor(a, b, useFrom);
  }

  /**
   * Returns true if all the given values are truthy.
   */
  static all(values: any[], useFrom?: boolean): boolean {
    return values.every((x) => B.toBoolean(x, useFrom));
  }

  /**
   * Returns true if any of the given values are truthy.
   */
  static any(values: any[], useFrom?: boolean): boolean {
    return values.some((x) => B.toBoolean(x, useFrom));
  }

  /**
   * Returns true if none of the given values are truthy.
   */
  static none(values: any[], useFrom?: boolean): boolean {
    return !B.any(values, useFrom);
  }

  /**
   * Returns true if any of the given values are falsy.
   */
  static anyFalse(values: any[], useFrom?: boolean): boolean {
    return !B.all(values, useFrom);
  }
}

const WrappedB = new Proxy(
  // The proxy makes it callable, using the `from()` method.
  B as typeof B & {
    (input: any): boolean;
  },
  {
    apply(target, _, argumentsList) {
      // @ts-ignore
      return target.from(...argumentsList);
    },
  }
);

export { WrappedB as B };
