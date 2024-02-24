import type { ToPrimitive } from "~/types/Primitives";

/**
 * The P class, for Primitives, provides useful methods for working with primitives globally.
 */
class P {
  /**
   * Converts any value to a primitive.
   * Primitives are returned as-is.
   * Primitive objects are converted to their primitive values.
   * `null` and `undefined` are converted to `null`.
   * Other values are converted using `[Symbol.toPrimitive]`, `valueOf()`, and `toString()`.
   * If none of these methods return a primitive, `undefined` is returned.
   * For exemple, a function will return `undefined` as it has no primitive value.
   * An array will return `undefined`, as making a generic conversion to primitive that works for all arrays is not possible.
   */
  static from<T, P extends "string" | "number" | "boolean" | "default">(
    input: T,
    prefer: P = "default" as P
  ): ToPrimitive<T> {
    switch (typeof input) {
      case "string":
      case "number":
      case "boolean":
        return input as any;
      case "symbol":
      case "function":
        return undefined as any;
      default: {
        if (input === null || input === undefined) return null as any;
        if (Array.isArray(input)) break;

        if (input instanceof Number) return input.valueOf() as any;
        if (input instanceof String) return input.valueOf() as any;
        if (input instanceof Boolean) return input.valueOf() as any;

        if (typeof (input as any)[Symbol.toPrimitive] === "function")
          return (input as any)[Symbol.toPrimitive](prefer) as any;

        if (typeof (input as any).valueOf === "function") {
          const valueOf = (input as any).valueOf();
          const typeOf = typeof valueOf;

          if (
            typeOf === "string" ||
            typeOf === "number" ||
            typeOf === "boolean"
          )
            return valueOf as any;

          // If the valueOf method returns a non-primitive, continue to the next step.
        }

        if (typeof (input as any).toString === "function") {
          const toString = input.toString();

          if (/^\[object \w+\]$/.test(toString)) {
            // If the return value of toString is a string like "[object Foo]", return undefined.
            // This is because a not-implemented toString method will return "[object Object]".
            return undefined as any;
          }

          return toString as any;
        }
      }
    }

    return undefined as any;
  }

  /**
   * Simple is-primitive check. Returns `true` for any primitive value, and their corresponding objects.
   *
   * Returns `true` for a string and a `String` object.
   * Returns `true` for a number and a `Number` object. `Infinity` and `NaN` both return `true`.
   * Returns `true` for a boolean and a `Boolean` object.
   * Returns `false` for any other value, including `null` and `undefined`.
   */
  static is(
    input: any
  ): input is string | String | number | Number | boolean | Boolean {
    return (
      typeof input === "string" ||
      typeof input === "number" ||
      typeof input === "boolean" ||
      input instanceof String ||
      input instanceof Number ||
      input instanceof Boolean
    );
  }

  /**
   * Returns a boolean whether the given input is a strict primitive.
   * Returns `true` for strings, numbers, and booleans.
   * Returns `false` for any primitive object, including `String`, `Number`, and `Boolean`.
   * Returns `false` for `null` and `undefined`.
   * Returns `false` for any other value.
   */
  static isStrict(num: any): num is string | number | boolean {
    return (
      typeof num === "string" ||
      typeof num === "number" ||
      typeof num === "boolean"
    );
  }

  /**
   * Returns a boolean whether the given input is nullish.
   * Returns `true` for `null`, `undefined` and `NaN`.
   * Returns `false` for any other value.
   */
  static isNullish(input: any): input is null | undefined | typeof NaN {
    return input === null || input === undefined || Number.isNaN(input);
  }
}

const WrappedP = new Proxy(
  P as typeof P & {
    <T, P extends "string" | "number" | "boolean" | "default">(
      input: T,
      prefer?: P
    ): ReturnType<typeof P.from<T, P>>;
  },
  {
    apply(target, _, argumentsList) {
      // @ts-ignore
      return target.from(...argumentsList);
    },
  }
);

export { WrappedP as P };
