import { toArray } from "./arrays/methods";
import { toBoolean } from "./booleans/methods";
import { toNumber } from "./numbers/methods";
import { toObject } from "./objects/methods";
import { toString } from "./strings/methods";

/** A simple object that stores the value of the proxy. */
export type ProxyValue<Value> = {
  value: Value;
};

/**
 * Returns an object with all the methods of the handler, but with the first argument removed and the return value wrapped in a proxy itself.
 * This allows for the methods to be chained together, where the first argument is always the value of the previous method.
 */
export type Proxied<Value, Handler> = {
  /** The internal value of the proxy, which type can be anything. */
  value: Value;
  /** Converts the internal value using the handler's `from` method. This means the return value will be the 'expected' type for example, a string when using `s()` or a number when using `n()`. */
  valueOf: "from" extends keyof Handler
    ? Handler["from"] extends (value: Value) => infer Return
      ? () => Return
      : never
    : never;
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

export function createProxy<Value, Handler extends object>(
  value: Value,
  handler: Handler
): Proxied<Value, Handler> {
  return new Proxy<ProxyValue<Value>>(
    { value },
    {
      get(target, key) {
        switch (key) {
          case "value":
            return target.value;
          case "valueOf":
            return () => target.value;
          case "toString":
            return () => toString(target.value);
          case "toNumber":
            return () => toNumber(target.value);
          case "toBoolean":
            return () => toBoolean(target.value);
          case "toArray":
            return () => toArray(target.value as []);
          case "toObject":
            return () => toObject(target.value);
        }

        const method = Reflect.get(handler, key, handler);

        if (typeof method !== "function") {
          return method;
        }

        return (...args: any[]) => {
          return createProxy(
            Reflect.apply(method, handler, [target.value, ...args]),
            handler
          );
        };
      },
    }
  ) as Proxied<Value, Handler>;
}
