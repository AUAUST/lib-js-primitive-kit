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

export function every<const T extends Arrayable, const S extends ArrayValue<T>>(
  array: T,
  predicate: TypeGuard<T, S>,
  thisArg?: any,
): this is S[];
export function every<const T extends Arrayable>(
  array: T,
  predicate: Callback<T, unknown>,
  thisArg?: any,
): boolean;
export function every<const T extends Arrayable>(
  array: T,
  predicate: keyof ArrayValue<T>,
  thisArg?: any,
): boolean;
export function every(
  array: Arrayable,
  predicate: Fn | PropertyKey,
  thisArg?: any,
) {
  if (isFunction(predicate)) {
    return toArray(array).every(predicate, thisArg);
  }

  return toArray(array).every(
    (value) => hasKey(value, predicate) && value[predicate],
  );
}
