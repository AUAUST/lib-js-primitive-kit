import type { ToPrimitive } from "~/primitives/types";

export function toPrimitive<
  T,
  P extends "string" | "number" | "boolean" | "default"
>(input: T, prefer: P = "default" as P): ToPrimitive<T> {
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

        if (typeOf === "string" || typeOf === "number" || typeOf === "boolean")
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

export function isPrimitive(input: any): input is string | number | boolean {
  switch (typeof input) {
    case "string":
    case "number":
    case "boolean":
      return true;
    default:
      return false;
  }
}

export function isNullish(input: any): input is null | undefined | typeof NaN {
  return input === null || input === undefined || Number.isNaN(input);
}

export function isSet<T>(input: T): input is NonNullable<T> {
  return input !== null && input !== undefined && input !== "undefined";
}
