import type {
  Arrayable,
  ArrayValue,
  Callback,
  TypeGuard,
} from "~/arrays/types";
import { defineMethod } from "~/compiler";
import type { Fn } from "~/functions";
import { isFunction } from "~/functions/methods";
import { hasKey } from "~/objects/methods";
import { toArray } from "./toArray";

export default defineMethod({
  instanceCallable: true,
});

export function find<const T extends Arrayable, const S extends ArrayValue<T>>(
  array: T,
  predicate: TypeGuard<T, S>,
  thisArg?: any,
): S | undefined;
export function find<const T extends Arrayable>(
  array: T,
  predicate: Callback<T, unknown>,
  thisArg?: any,
): ArrayValue<T> | undefined;
export function find<const T extends Arrayable>(
  array: T,
  predicate: keyof ArrayValue<T>,
  thisArg?: any,
): ArrayValue<T> | undefined;
export function find(
  array: Arrayable,
  predicate: Fn | PropertyKey,
  thisArg?: any,
) {
  if (isFunction(predicate)) {
    return toArray(array).find(predicate, thisArg);
  }

  return toArray(array).find(
    (value) => hasKey(value, predicate) && value[predicate],
  );
}
