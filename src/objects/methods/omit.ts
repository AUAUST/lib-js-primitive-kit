import { isArray } from "~/arrays/methods";
import type { Fn } from "~/functions";
import { isFunction } from "~/functions/methods";
import type { ObjectType, Writable } from "../types";
import { keys } from "./keys";

export type Mapped<
  T extends ObjectType,
  C extends (key: keyof T, value: T[keyof T]) => any
> = Writable<{
  [P in keyof T]: ReturnType<C>;
}>;

export type Omitted<T extends ObjectType, K extends keyof T> = Writable<
  Omit<T, K>
>;

export type OmittedMapped<
  T extends ObjectType,
  K extends keyof T,
  C extends (key: keyof T, value: T[keyof T]) => any
> = Omitted<Mapped<T, C>, K>;

export function omit<T extends ObjectType, K extends keyof T>(
  obj: T,
  keys: readonly K[]
): Omitted<T, K>;
export function omit<T extends ObjectType, K extends keyof T>(
  obj: T,
  predicate: (key: K, value: T[K], obj: T) => boolean
): Partial<Writable<T>>;
export function omit<
  T extends ObjectType,
  K extends keyof T,
  C extends (key: keyof T, value: T[keyof T]) => any
>(obj: T, keys: readonly K[], callback: C): OmittedMapped<T, K, C>;
export function omit<
  T extends ObjectType,
  K extends keyof T,
  C extends (key: keyof T, value: T[keyof T]) => any
>(
  obj: T,
  predicate: (key: K, value: T[K], obj: T) => boolean,
  transform: C
): Partial<Mapped<T, C>>;
export function omit(
  obj: ObjectType,
  keysOrPredicate: readonly PropertyKey[] | Fn,
  transform?: Fn
): ObjectType {
  let included: PropertyKey[] = keys(obj);

  // If the second argument is a function, we only include keys that do not
  // pass the predicate test. The predicate function must return a boolean
  // indicating whether to *omit* the key or not. `true` means omit, `false` means include.
  if (isFunction(keysOrPredicate)) {
    included = included.filter((key) => !keysOrPredicate(key, obj[key]));
  }

  // If the second argument is an array, we only include keys that are not in the array.
  else if (isArray(keysOrPredicate)) {
    included = included.filter((key) => !keysOrPredicate.includes(key));
  }

  // If the function is incorrectly used, we want to throw an explicit error
  // rather than let the function return an empty object silently.
  else {
    throw new TypeError(
      "omit expects an array of keys or a predicate function as the second argument"
    );
  }

  const output: ObjectType = {};
  const shouldTransform = isFunction(transform);

  for (const key of included) {
    output[key] = shouldTransform ? transform(key, obj[key]) : obj[key];
  }

  return output;
}
