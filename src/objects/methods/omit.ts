import { isArray } from "~/arrays/methods";
import { defineMethod } from "~/compiler";
import type { Fn } from "~/functions";
import { isFunction } from "~/functions/methods";
import type { GenericRecord, Writable } from "../types";
import { keys } from "./keys";

export default defineMethod({
  instanceCallable: "chainable",
});

export type Mapped<
  T extends GenericRecord,
  C extends (key: keyof T, value: T[keyof T]) => any,
> = Writable<{
  [P in keyof T]: ReturnType<C>;
}>;

export type Omitted<T extends GenericRecord, K extends keyof T> = Writable<
  Omit<T, K>
>;

export type OmittedMapped<
  T extends GenericRecord,
  K extends keyof T,
  C extends (key: keyof T, value: T[keyof T]) => any,
> = Omitted<Mapped<T, C>, K>;

/**
 * Returns a new object with the same properties as the input object except for the ones that are present in the `omit` array.
 * Passing an empty array will return a shallow copy of the input object.
 */
export function omit<T extends GenericRecord, K extends keyof T>(
  obj: T,
  keys: readonly K[],
): Omitted<T, K>;
export function omit<T extends GenericRecord, K extends keyof T>(
  obj: T,
  predicate: (key: K, value: T[K], obj: T) => boolean,
): Partial<Writable<T>>;
export function omit<
  T extends GenericRecord,
  K extends keyof T,
  C extends (key: keyof T, value: T[keyof T]) => any,
>(obj: T, keys: readonly K[], callback: C): OmittedMapped<T, K, C>;
export function omit<
  T extends GenericRecord,
  K extends keyof T,
  C extends (key: keyof T, value: T[keyof T]) => any,
>(
  obj: T,
  predicate: (key: K, value: T[K], obj: T) => boolean,
  transform: C,
): Partial<Mapped<T, C>>;
export function omit(
  obj: GenericRecord,
  keysOrPredicate: readonly PropertyKey[] | Fn,
  transform?: Fn,
): GenericRecord {
  let included: (string | number)[] = keys(obj);

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
      "omit expects an array of keys or a predicate function as the second argument",
    );
  }

  const output: GenericRecord = {};
  const shouldTransform = isFunction(transform);

  for (const key of included) {
    output[key] = shouldTransform ? transform(key, obj[key]) : obj[key];
  }

  return output;
}
