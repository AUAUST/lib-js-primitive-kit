import { isArray } from "~/arrays/methods";
import { isFunction } from "~/functions/methods";
import type { ToPrimitive } from "~/primitives/types";

export function toPrimitive<
  T,
  P extends "string" | "number" | "boolean" | "default"
>(input: T, prefer: P = "default" as P): ToPrimitive<T> {
  switch (typeof input) {
    case "string":
    case "number":
    case "boolean":
      return <any>input;
    case "bigint":
      return <any>(input.toString() + "n");
    case "symbol":
    case "function":
      return undefined!;
    default: {
      if (input === null || input === undefined) {
        return null!;
      }

      if (isArray(input)) {
        return undefined!;
      }

      if (isFunction((<any>input)[Symbol.toPrimitive])) {
        return (<any>input)[Symbol.toPrimitive](prefer);
      }

      if (isFunction(input.valueOf)) {
        const valueOf = input.valueOf();

        if (isPrimitive(valueOf)) {
          return <any>valueOf;
        }
      }

      if (isFunction(input.toString)) {
        const toString = input.toString();

        if (/^\[object \w+\]$/.test(toString)) {
          // If the return value of toString is a string like "[object Foo]", return undefined.
          // This is because a not-implemented toString method will return "[object Object]".
          return undefined!;
        }

        return <any>toString;
      }
    }
  }

  return undefined!;
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

export function isObject(input: any): input is object {
  return !!input && (typeof input === "object" || typeof input === "function");
}

export function isNullish(input: any): input is null | undefined | typeof NaN {
  return input === null || input === undefined || Number.isNaN(input);
}

export function isSet<T>(input: T): input is NonNullable<T> {
  return input !== null && input !== undefined && input !== "undefined";
}

export function isPropertyKey(input: any): input is PropertyKey {
  switch (typeof input) {
    case "string":
    case "number":
    case "symbol":
      return true;
    default:
      return false;
  }
}
