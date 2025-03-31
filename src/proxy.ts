import { A, type Arrayable } from "./arrays";
import { isArray, isIterable, toArray } from "./arrays/methods";
import { B, type Booleanifiable } from "./booleans";
import { toBoolean } from "./booleans/methods";
import { isFunction } from "./functions/methods";
import { N, type Numberifiable } from "./numbers";
import { toNumber } from "./numbers/methods";
import { O } from "./objects";
import { toObject } from "./objects/methods";
import { S, type Stringifiable } from "./strings";
import { toString } from "./strings/methods";

/** A simple object that stores the value of the proxy. */
type ProxiedTarget<Value> = {
  value: Value;
};

/** The value converted to the "handler's type". */
type ProxyValue<Value, Handler> = "from" extends keyof Handler
  ? Handler["from"] extends (value: Value) => infer Return
    ? Return
    : never
  : Value;

type Hint = "string" | "number" | "default" | undefined;

type ToPrimitive<H extends Hint, Value> = H extends "string"
  ? string
  : H extends "number"
  ? number
  : Value;

/** The methods to access the internal value of the proxy. */
type ProxyMethods<Value, Handler> = {
  /** The internal value of the proxy, which type can be anything. */
  value: ProxyValue<Value, Handler>;
  /** Converts the internal value using the handler's `from` method. This means the return value will be the 'expected' type for example, a string when using `s()` or a number when using `n()`. */
  valueOf: () => ProxyValue<Value, Handler>;
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
type HandlerMethods<Value, Handler> = {
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
type PrototypeMethods<Value, Handler> = {
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
type Proxied<Value, Handler> = ProxyMethods<Value, Handler> &
  HandlerMethods<Value, Handler> &
  PrototypeMethods<Value, Handler>;

function createProxy<Value, Handler extends object>(
  value: Value,
  handler: Handler
): Proxied<Value, Handler> {
  return new Proxy<ProxiedTarget<Value>>(
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
          case "s":
            return () => s(value as Stringifiable);
          case "n":
            return () => n(value as Numberifiable);
          case "b":
            return () => b(value as Booleanifiable);
          case "a":
            return () => a(value as Arrayable);
          case "o":
            return () => o(value as object);
          case Symbol.toPrimitive:
            return (hint?: Hint) => {
              switch (hint) {
                case "string":
                  return toString(value);
                case "number":
                  return toNumber(value);
                default:
                  return value;
              }
            };
          case Symbol.iterator:
            if (isIterable(value)) {
              return value[Symbol.iterator].bind(value);
            }

            return undefined;
        }

        const method = Reflect.get(handler, key, handler);

        if (!isFunction(method)) {
          if (value === null || value === undefined) {
            return undefined;
          }

          const property = Reflect.get(Object(value), key, value);

          if (isFunction(property)) {
            return (...args: any[]) =>
              proxied(Reflect.apply(property, value, args));
          }

          return proxied(property);
        }

        return (...args: any[]) =>
          proxied(Reflect.apply(method, handler, [value, ...args]));
      },
    }
  ) as Proxied<Value, Handler>;
}

type ProxiedArray<T> = Proxied<T, typeof A>;

function a(): ProxiedArray<undefined>;
function a<T extends Arrayable | null | undefined>(value: T): ProxiedArray<T>;
function a<T>(
  length: number,
  mapFn?: (v: undefined, k: number) => T
): ProxiedArray<T[]>;

/**
 * Proxies the given value, converting it to an array using the same logic as `A.from()`.
 * All methods from the array prototype and `A` are available on the proxy, and can be chained together.
 */
function a(value?: unknown, mapFn?: unknown): unknown {
  return createProxy(toArray(<any>value, <any>mapFn), A);
}

type ProxiedBoolean<T> = Proxied<T, typeof B>;

function b(): ProxiedBoolean<undefined>;
function b<T extends Booleanifiable | null | undefined>(
  value: T
): ProxiedBoolean<T>;

/**
 * Proxies the given value, converting it to a boolean using the same logic as `B.from()`.
 * All methods from the boolean prototype and `B` are available on the proxy, and can be chained together.
 */
function b(value?: unknown): unknown {
  return createProxy(toBoolean(value), B);
}

type ProxiedNumber<T> = Proxied<T, typeof N>;

function n(): ProxiedNumber<undefined>;
function n<T extends Numberifiable | null | undefined>(
  value: T
): ProxiedNumber<T>;

/**
 * Proxies the given value, converting it to a number using the same logic as `N.from()`.
 * All methods from the number prototype and `N` are available on the proxy, and can be chained together.
 */
function n(value?: unknown): unknown {
  return createProxy(toNumber(value), N);
}

type ProxiedObject<T> = Proxied<T, typeof O>;

function o(): ProxiedObject<undefined>;
function o<T>(value: T): ProxiedObject<T>;

/**
 * Proxies the given value, converting it to an object using the same logic as `O.from()`.
 * All methods from the object prototype and `O` are available on the proxy, and can be chained together.
 */
function o(value?: unknown): unknown {
  return createProxy(toObject(value), O);
}

type ProxiedString<T> = Proxied<T, typeof S>;

function s(): ProxiedString<undefined>;
function s<T extends Stringifiable | null | undefined>(
  value: T
): ProxiedString<T>;

/**
 * Proxies the given value, converting it to a string using the same logic as `S.from()`.
 * All methods from the string prototype and `S` are available on the proxy, and can be chained together.
 */
function s(value?: unknown): unknown {
  return createProxy(toString(value), S);
}

type ProxyFor<Value> = Value extends string
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

/**
 * Returns the best proxy for the given value.
 * Strings will be passed to `s()`, numbers to `n()`, booleans to `b()`, arrays to `a()`, and objects to `o()`.
 * Passing `null` or `undefined` will return `undefined`, without a proxy.
 */
function proxied<Value>(value: Value): ProxyFor<Value> {
  switch (typeof value) {
    case "string":
      return <any>s(value);
    case "boolean":
      return <any>b(value);
    case "number":
      return <any>n(value);
    case "object":
      if (value === null) {
        break;
      }

      if (isArray(value)) {
        return <any>a(value);
      }

      return <any>o(value);
  }

  return undefined!;
}

export { a, b, createProxy, n, o, proxied, s };
export type {
  Proxied,
  ProxiedArray,
  ProxiedBoolean,
  ProxiedNumber,
  ProxiedObject,
  ProxiedString,
  ProxiedTarget,
  ProxyValue,
};
