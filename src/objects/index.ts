import {
  clone,
  deepGet,
  defineProperty,
  definePropertyIfUnset,
  entries,
  equals,
  flat,
  groupBy,
  hasKey,
  hasKeys,
  isNotObject,
  isObject,
  isStrictObject,
  keys,
  omit,
  pick,
  pull,
  toObject,
  values,
} from "~/objects/methods";

// That mess is required to make TS happy.
// Those are the keys which `O`'s implementation signature don't extend `Object`.
// It's used to make TypeScript happy by excluding them from the `Object` type.
type Diff = "keys" | "values" | "entries" | "defineProperty";
const Obj = Object as Omit<typeof Object, Diff> & (new () => Object);

/** The O class, for Object, provides useful methods for working with objects. */
class O extends Obj {
  static from = toObject;

  static is = isObject;

  static isNot = isNotObject;

  static isStrict = isStrictObject;

  static keys = keys;

  static values = values;

  static entries = entries;

  static equals = equals;

  static in = hasKey;

  static deepGet = deepGet;

  static flat = flat;

  static clone = clone;

  static hasKeys = hasKeys;

  /** @borrows Object.defineProperty as defineProperty */
  static defineProperty = defineProperty;

  static definePropertyIfUnset = definePropertyIfUnset;

  static groupBy = groupBy;

  static pick = pick;

  static omit = omit;

  static pull = pull;
}

const WrappedO = new Proxy(O as typeof O & typeof toObject, {
  apply(target, _, argumentsList) {
    return target.from(...argumentsList);
  },
});

export { WrappedO as O };

export type { ToObject } from "~/objects/methods";
export type { ObjectType, Writable, WritableRecursive } from "~/objects/types";
