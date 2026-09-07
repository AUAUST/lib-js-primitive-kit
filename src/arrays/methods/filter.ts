import type {
  Arrayable,
  ArrayValue,
  Callback,
  ToArray,
  TypeGuard,
} from "~/arrays/types";
import { defineMethod } from "~/compiler";
import type { Fn } from "~/functions";
import { isFunction } from "~/functions/methods";
import { hasKey } from "~/objects/methods";
import { toArray } from "./toArray";

export default defineMethod({
  instanceCallable: "chainable",
});

export function filter<const T extends Arrayable, const S extends ArrayValue<T>>(
  array: T,
  predicate: TypeGuard<T, S>,
  thisArg?: any,
): S[];
export function filter<const T extends Arrayable>(
  array: T,
  predicate: Callback<T, unknown>,
  thisArg?: any,
): T[];
export function filter<const T extends Arrayable>(
  array: T,
  predicate: keyof ArrayValue<T>,
  thisArg?: any,
): ToArray<T>;
export function filter(
  array: Arrayable,
  predicate: Fn | PropertyKey,
  thisArg?: any,
) {
  if (isFunction(predicate)) {
    return toArray(array).filter(predicate, thisArg);
  }

  return toArray(array).filter(
    (value) => hasKey(value, predicate) && value[predicate],
  );
}
