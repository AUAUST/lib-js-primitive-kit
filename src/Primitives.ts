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
   * Simple is-primitive check. Returns `true` for any primitive value.
   *
   * Returns `true` for strings, numbers, and booleans.
   * `Infinity` and `NaN` both return `true`.
   * Returns `false` for any other value, including `null`, `undefined` and functions.
   */
  static is(input: any): input is string | number | boolean {
    switch (typeof input) {
      case "string":
      case "number":
      case "boolean":
        return true;
      default:
        return false;
    }
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
