import { isArray } from "~/arrays/methods";
import { isFunction } from "~/functions/methods";
import type { ToPrimitive } from "~/primitives/types";
import { isPrimitive } from "./isPrimitive";

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
