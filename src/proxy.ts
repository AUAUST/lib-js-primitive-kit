import { A, type Arrayable } from "./arrays";
import { toArray } from "./arrays/methods";
import { B, type Booleanifiable } from "./booleans";
import { toBoolean } from "./booleans/methods";
import { N, type Numberifiable } from "./numbers";
import { toNumber } from "./numbers/methods";
import { O } from "./objects";
import { toObject } from "./objects/methods";
import { S, type Stringifiable } from "./strings";
import { toString } from "./strings/methods";

/** A simple object that stores the value of the proxy. */
export type ProxyValue<Value> = {
  value: Value;
};

/** The value converted to the "handler's type". */
export type HandlerValue<Value, Handler> = "from" extends keyof Handler
  ? Handler["from"] extends (value: Value) => infer Return
    ? Return
    : never
  : Value;

/**
 * Returns an object with all the methods of the handler, but with the first argument removed and the return value wrapped in a proxy itself.
 * This allows for the methods to be chained together, where the first argument is always the value of the previous method.
 */
export type Proxied<Value, Handler> = {
  /** The internal value of the proxy, which type can be anything. */
  value: HandlerValue<Value, Handler>;
  /** Converts the internal value using the handler's `from` method. This means the return value will be the 'expected' type for example, a string when using `s()` or a number when using `n()`. */
  valueOf: () => HandlerValue<Value, Handler>;
  /** Converts the internal value to a string using the same logic as `S.from()`. */
  toString: () => ReturnType<typeof toString<Value>>;
  /** Converts the internal value to a number using the same logic as `N.from()`. */
  toNumber: () => ReturnType<typeof toNumber>;
  /** Converts the internal value to a boolean using the same logic as `B.from()`. */
  toBoolean: () => ReturnType<typeof toBoolean>;
  /** Converts the internal value to an array using the same logic as `A.from()`. */
  toArray: () => ReturnType<typeof toArray<Value & ArrayLike<any>>>;
  /** Converts the internal value to an object using the same logic as `O.from()`. */
  toObject: () => ReturnType<typeof toObject<Value>>;
} & {
  [Key in keyof Handler]: Handler[Key] extends (
    value: Value,
    ...args: infer Args
  ) => infer Return
    ? (...args: Args) => Proxied<Return, Handler>
    : Handler[Key] extends (value: Value) => infer Return
    ? () => Proxied<Return, Handler>
    : Handler[Key];
};

function createProxy<Value, Handler extends object>(
  value: Value,
  handler: Handler
): Proxied<Value, Handler> {
  return new Proxy<ProxyValue<Value>>(
    { value },
    {
      get(target, key) {
        const value = target.value;

        switch (key) {
          case "value":
            return value;
          case "valueOf":
            return () => value;
          case "toString":
            return () => toString(value);
          case "toNumber":
            return () => toNumber(value);
          case "toBoolean":
            return () => toBoolean(value);
          case "toArray":
            return () => toArray(value as []);
          case "toObject":
            return () => toObject(value);
        }

        const method = Reflect.get(handler, key, handler);

        if (typeof method !== "function") {
          return method;
        }

        return (...args: any[]) => {
          return createProxy(
            Reflect.apply(method, handler, [value, ...args]),
            handler
          );
        };
      },
    }
  ) as Proxied<Value, Handler>;
}

type ProxiedArray<T> = Proxied<T, typeof A>;

function a(): ProxiedArray<undefined>;
function a<T extends Arrayable | null | undefined>(value: T): ProxiedArray<T>;
function a(value?: unknown): unknown {
  return createProxy(toArray(value as []), A);
}

type ProxiedBoolean<T> = Proxied<T, typeof B>;

function b(): ProxiedBoolean<undefined>;
function b<T extends Booleanifiable | null | undefined>(
  value: T
): ProxiedBoolean<T>;
function b(value?: unknown): unknown {
  return createProxy(toBoolean(value), B);
}

type ProxiedNumber<T> = Proxied<T, typeof N>;

function n(): ProxiedNumber<undefined>;
function n<T extends Numberifiable | null | undefined>(
  value: T
): ProxiedNumber<T>;
function n(value?: unknown): unknown {
  return createProxy(toNumber(value), N);
}

type ProxiedObject<T> = Proxied<T, typeof O>;

function o(): ProxiedObject<undefined>;
function o<T extends object | null | undefined>(value: T): ProxiedObject<T>;
function o(value?: unknown): unknown {
  return createProxy(toObject(value), O);
}

type ProxiedString<T> = Proxied<T, typeof S>;

function s(): ProxiedString<undefined>;
function s<T extends Stringifiable | null | undefined>(
  value: T
): ProxiedString<T>;
function s(value?: unknown): unknown {
  return createProxy(toString(value), S);
}

/** Returns the best proxy for the given value. */
function proxied<Value>(value: Value) {
  switch (typeof value) {
    case "string":
      return s(value);
  }

  throw new TypeError("Cannot create a proxy for the given value.");
}

export { a, b, createProxy, n, o, proxied, s };
