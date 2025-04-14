import type { toArray } from "~/arrays/methods";
import type { toBoolean } from "~/booleans/methods";
import type { toNumber } from "~/numbers/methods";
import type { toObject } from "~/objects/methods";
import type { ObjectType } from "~/objects/types";
import type { Stringifiable } from "~/strings";
import type { toString } from "~/strings/methods";
import type {
  ProxiedArray,
  ProxiedBoolean,
  ProxiedNumber,
  ProxiedObject,
  ProxiedString,
} from ".";

/** A simple object that stores the value of the proxy. */
export type ProxyTarget<Value> = {
  value: Value;
};

/** The value converted to the "handler's type". */
export type ProxyValue<Value, Handler> = "from" extends keyof Handler
  ? Handler["from"] extends (value: Value) => infer Return
    ? Return
    : never
  : Value;

export type Hint = "string" | "number" | "default" | undefined;

export type ToPrimitive<H extends Hint, Value> = H extends "string"
  ? string
  : H extends "number"
  ? number
  : Value;

/** The methods to access the internal value of the proxy. */
export type ProxyMethods<Value, Handler> = {
  /** The internal value of the proxy, which type can be anything. */
  value: ProxyValue<Value, Handler>;
  /** Converts the internal value using the handler's `from` method. This means the return value will be the 'expected' type for example, a string when using `s()` or a number when using `n()`. */
  valueOf: () => ProxyValue<Value, Handler>;
  /** Converts the internal value to a string using the same logic as `S.from()`. */
  toString: () => ReturnType<typeof toString<Value & Stringifiable>>;
  /** Converts the internal value to a number using the same logic as `N.from()`. */
  toNumber: () => ReturnType<typeof toNumber>;
  /** Converts the internal value to a boolean using the same logic as `B.from()`. */
  toBoolean: () => ReturnType<typeof toBoolean>;
  /** Converts the internal value to an array using the same logic as `A.from()`. */
  toArray: () => ReturnType<typeof toArray<Value & ArrayLike<any>>>;
  /** Converts the internal value to an object using the same logic as `O.from()`. */
  toObject: () => ReturnType<typeof toObject<Value & ObjectType>>;
  /** Converts the internal value to a string using the same logic as `S.from()` and wraps it in a proxy. Useful to change the type of the value in the chain. */
  s: () => ProxiedString<Value>;
  /** Converts the internal value to a number using the same logic as `N.from()` and wraps it in a proxy. Useful to change the type of the value in the chain. */
  n: () => ProxiedNumber<Value>;
  /** Converts the internal value to a boolean using the same logic as `B.from()` and wraps it in a proxy. Useful to change the type of the value in the chain. */
  b: () => ProxiedBoolean<Value>;
  /** Converts the internal value to an array using the same logic as `A.from()` and wraps it in a proxy. Useful to change the type of the value in the chain. */
  a: () => ProxiedArray<Value>;
  /** Converts the internal value to an object using the same logic as `O.from()` and wraps it in a proxy. Useful to change the type of the value in the chain. */
  o: () => ProxiedObject<Value>;
  [Symbol.toPrimitive]: <H extends Hint>(hint?: H) => ToPrimitive<H, Value>;
  [Symbol.iterator]: ProxyValue<Value, Handler> extends Iterable<infer T>
    ? () => Iterator<T>
    : undefined;
};

/** All the methods from the handler, with the first argument removed in favor of the internal value. */
export type HandlerMethods<Value, Handler> = {
  [Key in Exclude<
    keyof Handler,
    keyof ProxyMethods<Value, Handler>
  >]: Handler[Key] extends (value: Value, ...args: infer Args) => infer Return
    ? (...args: Args) => ProxyFor<Return>
    : Handler[Key] extends <V>(value: V, ...args: infer Args) => V
    ? (...args: Args) => ProxyFor<Value>
    : Handler[Key] extends (value: any, ...args: infer Args) => infer Return
    ? (...args: Args) => ProxyFor<Return>
    : Handler[Key] extends (...args: infer Args) => infer Return
    ? (
        ...args: Args extends [any, ...infer Rest] ? Rest : Args
      ) => ProxyFor<Return>
    : never;
};

/** All the methods from the value's prototype, except for the ones that are already defined in the handler. */
export type PrototypeMethods<Value, Handler> = {
  [Key in Exclude<
    keyof Value,
    keyof HandlerMethods<Value, Handler> | keyof ProxyMethods<Value, Handler>
  >]: Value[Key] extends (...args: infer Args) => infer Return
    ? (...args: Args) => ProxyFor<Return>
    : ProxyFor<Value[Key]>;
};

/**
 * Returns an object with all the methods of the handler, but with the first argument removed and the return value wrapped in a proxy itself.
 * This allows for the methods to be chained together, where the first argument is always the value of the previous method.
 */
export type Proxied<Value, Handler> = ProxyMethods<Value, Handler> &
  HandlerMethods<Value, Handler> &
  PrototypeMethods<Value, Handler>;

export type ProxyFor<Value> = Value extends string
  ? ProxiedString<Value>
  : Value extends number
  ? ProxiedNumber<Value>
  : Value extends boolean
  ? ProxiedBoolean<Value>
  : Value extends (infer T)[]
  ? ProxiedArray<T[]>
  : Value extends object
  ? ProxiedObject<Value>
  : undefined;
