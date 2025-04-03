import { isArray } from "~/arrays/methods";
import { isFunction } from "~/functions/methods";
import { isObject } from "~/objects/methods";
import { isPrimitive } from "./isPrimitive";

export type ToPrimitive<T> = T extends number | string | boolean
  ? T
  : T extends Number | String | Boolean
  ? ReturnType<T["valueOf"]>
  : T extends null | undefined
  ? null
  : T extends symbol | (() => any)
  ? undefined
  : T extends {
      [Symbol.toPrimitive](): infer U;
    }
  ? U
  : T extends {
      valueOf(): infer U;
    }
  ? U
  : T extends {
      toString(): infer U;
    }
  ? U
  : undefined;

export function toPrimitive<T>(input: T, prefer?: undefined): ToPrimitive<T>;
export function toPrimitive<T>(
  input: T,
  prefer: "string"
): T extends string ? T : string;
export function toPrimitive<T>(
  input: T,
  prefer: "number"
): T extends number ? T : number;
export function toPrimitive(input: unknown, prefer: "boolean"): boolean;
export function toPrimitive(
  input: unknown,
  prefer: "string" | "number" | "boolean" | "default" = "default"
): unknown {
  switch (typeof input) {
    case "string":
    case "number":
    case "boolean":
      return input;
    case "bigint":
      return input.toString() + "n";
    case "symbol":
    case "function":
      return undefined!;
    default: {
      if (!isObject(input, true)) {
        return null!;
      }

      if (isArray(input)) {
        return undefined!;
      }

      if (isFunction(input[Symbol.toPrimitive])) {
        // @ts-expect-error
        return input[Symbol.toPrimitive](prefer);
      }

      if (isFunction(input.valueOf)) {
        const valueOf = input.valueOf();

        if (isPrimitive(valueOf)) {
          return valueOf;
        }
      }

      if (isFunction(input.toString)) {
        const toString = input.toString();

        if (/^\[object \w+\]$/.test(toString)) {
          // If the return value of toString is a string like "[object Foo]", return undefined.
          // This is because a not-implemented toString method will return "[object Object]".
          return undefined;
        }

        return toString;
      }
    }
  }

  return undefined;
}
