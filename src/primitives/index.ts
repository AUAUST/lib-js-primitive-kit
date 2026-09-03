import {
  isNullish,
  isObject,
  isPrimitive,
  isPropertyKey,
  isSet,
  toPrimitive,
} from "~/primitives/methods";

/**
 * The P class, for Primitives, provides useful methods for working with primitives globally.
 */
class P {
  static from = toPrimitive;

  static isPrimitive = isPrimitive;

  static isObject = isObject;

  static isNullish = isNullish;

  static isSet = isSet;

  static isPropertyKey = isPropertyKey;
}

const WrappedP = new Proxy(P as typeof P & typeof toPrimitive, {
  apply(target, _, argumentsList) {
    return target.from(...argumentsList);
  },
});

export { WrappedP as P };
