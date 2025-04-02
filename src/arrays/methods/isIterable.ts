import { isFunction } from "~/functions/methods";

export function isIterable(arr: any): arr is Iterable<unknown> {
  return isFunction(arr?.[Symbol.iterator]);
}
