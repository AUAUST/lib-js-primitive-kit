import { A, type Arrayable } from "../arrays";
import { isArray, isIterable, toArray } from "../arrays/methods";
import { B, type Booleanifiable } from "../booleans";
import { toBoolean } from "../booleans/methods";
import { isFunction } from "../functions/methods";
import { N, type Numberifiable } from "../numbers";
import { toNumber } from "../numbers/methods";
import { O } from "../objects";
import { toObject } from "../objects/methods";
import { S, type Stringifiable } from "../strings";
import { toString } from "../strings/methods";
import type { Hint, Proxied, ProxyTarget, ProxyValue } from "./types";

const proxyMethods = {
  valueOf: (value: unknown) => value,
  toArray: (value: unknown) => toArray(value),
  toBoolean: (value: unknown) => toBoolean(value),
  toNumber: (value: unknown) => toNumber(value),
  toObject: (value: unknown) => toObject(value),
  toString: (value: unknown) => toString(value),
  a: (value: unknown) => a(value),
  b: (value: unknown) => b(value),
  n: (value: unknown) => n(value),
  o: (value: unknown) => o(value),
  s: (value: unknown) => s(value),
  [Symbol.toPrimitive]: (value: unknown, hint: Hint = "default") => {
    switch (hint) {
      case "string":
        return toString(value);
      case "number":
        return toNumber(value);
      default:
        return value;
    }
  },
  [Symbol.iterator]: (value: unknown) => {
    if (isIterable(value)) {
      return value[Symbol.iterator]();
    }
  },
} as const;

function createProxy<Value, Handler extends object>(
  value: Value,
  handler: Handler
): Proxied<Value, Handler> {
  return <Proxied<Value, Handler>>new Proxy<ProxyTarget<Value>>(
    { value },
    {
      get(target, key) {
        const { value } = target;

        // If we are accessing the property `value`, we return the raw underlying value.
        if (key === "value") {
          return value;
        }

        // First, we try to access the method on the proxy methods.
        // They provide the basic proxy functionality, thus have the highest priority.
        const proxyMethod = Reflect.get(proxyMethods, key, proxyMethods);

        if (isFunction(proxyMethod)) {
          return () => {
            return proxyMethod(value);
          };
        }

        // Then, we try to access the method on the handler.
        // We give the handler higher priority than the prototype methods as they might
        // need to override the default behavior of the prototype methods.
        const handlerMethod = Reflect.get(handler, key, handler);

        if (isFunction(handlerMethod)) {
          return (...args: any[]) => {
            return proxied(
              Reflect.apply(handlerMethod, handler, [value, ...args])
            );
          };
        }

        // If the value is nullish, it doesn't have a prototype thus no methods.
        // In this case, we return undefined.
        if (value === null || value === undefined) {
          return undefined;
        }

        // We wrap the value in `Object()` to be able to get properties from primitives.
        // From example, attempting to get `charAt` on a string will return the string prototype's `charAt` method.
        const prototypeMethod = Reflect.get(Object(value), key, value);

        // If the property is a function, we call is on the value and return the proxied result.
        // This allows us to chain methods together.
        if (isFunction(prototypeMethod)) {
          return (...args: any[]) => {
            return proxied(Reflect.apply(prototypeMethod, value, args));
          };
        }

        // If the property is not a function, we return it proxied.
        // For example, accessing `length` on an array will return the array's length wrapped in a `n()` proxy.
        // `proxied` also takes care of returning `undefined` if the value is nullish.
        return proxied(prototypeMethod);
      },
    }
  );
}

type ProxiedArray<T> = Proxied<T, typeof A>;

/**
 * Proxies the given value, converting it to an array using the same logic as `A.from()`.
 * All methods from the array prototype and `A` are available on the proxy, and can be chained together.
 */
function a(): ProxiedArray<undefined>;
function a<T extends Arrayable | null | undefined>(value: T): ProxiedArray<T>;
function a<T>(
  length: number,
  mapFn?: (v: undefined, k: number) => T
): ProxiedArray<T[]>;
function a(value: unknown): ProxiedArray<unknown>;
function a(value?: unknown, mapFn?: unknown): unknown {
  return createProxy(toArray(<any>value, <any>mapFn), A);
}

type ProxiedBoolean<T> = Proxied<T, typeof B>;

/**
 * Proxies the given value, converting it to a boolean using the same logic as `B.from()`.
 * All methods from the boolean prototype and `B` are available on the proxy, and can be chained together.
 */
function b(): ProxiedBoolean<undefined>;
function b<T extends Booleanifiable | null | undefined>(
  value: T
): ProxiedBoolean<T>;
function b(value: unknown): ProxiedBoolean<unknown>;
function b(value?: unknown): unknown {
  return createProxy(toBoolean(value), B);
}

type ProxiedNumber<T> = Proxied<T, typeof N>;

/**
 * Proxies the given value, converting it to a number using the same logic as `N.from()`.
 * All methods from the number prototype and `N` are available on the proxy, and can be chained together.
 */
function n(): ProxiedNumber<undefined>;
function n<T extends Numberifiable | null | undefined>(
  value: T
): ProxiedNumber<T>;
function n(value: unknown): ProxiedNumber<unknown>;
function n(value?: unknown): unknown {
  return createProxy(toNumber(value), N);
}

type ProxiedObject<T> = Proxied<T, typeof O>;

/**
 * Proxies the given value, converting it to an object using the same logic as `O.from()`.
 * All methods from the object prototype and `O` are available on the proxy, and can be chained together.
 */
function o(): ProxiedObject<undefined>;
function o<T>(value: T): ProxiedObject<T>;
function o(value: unknown): ProxiedObject<unknown>;
function o(value?: unknown): unknown {
  return createProxy(toObject(value), O);
}

type ProxiedString<T> = Proxied<T, typeof S>;

/**
 * Proxies the given value, converting it to a string using the same logic as `S.from()`.
 * All methods from the string prototype and `S` are available on the proxy, and can be chained together.
 */
function s(): ProxiedString<undefined>;
function s<T extends Stringifiable>(value: T): ProxiedString<T>;
function s(value: unknown): ProxiedString<unknown>;
function s(value?: unknown): unknown {
  return createProxy(toString(value), S);
}

/**
 * Returns the best proxy for the given value.
 * Strings will be passed to `s()`, numbers to `n()`, booleans to `b()`, arrays to `a()`, and objects to `o()`.
 * Passing `null` or `undefined` will return `undefined`, without a proxy.
 */
function proxied(value?: undefined | null): undefined;
function proxied<T extends string>(value: T): ProxiedString<T>;
function proxied<T extends number>(value: T): ProxiedNumber<T>;
function proxied<T extends boolean>(value: T): ProxiedBoolean<T>;
function proxied<T extends any[]>(value: T): ProxiedArray<T>;
function proxied<T extends object>(value: T): ProxiedObject<T>;
function proxied(value: unknown): unknown;
function proxied(value: unknown): unknown {
  switch (typeof value) {
    case "string":
      return s(value);
    case "boolean":
      return b(value);
    case "number":
      return n(value);
    case "object":
      if (value === null) {
        break;
      }

      if (isArray(value)) {
        return a(value);
      }

      return o(value);
  }

  return undefined;
}

export { a, b, createProxy, n, o, proxied, s };
export type {
  Proxied,
  ProxiedArray,
  ProxiedBoolean,
  ProxiedNumber,
  ProxiedObject,
  ProxiedString,
  ProxyTarget,
  ProxyValue,
};
