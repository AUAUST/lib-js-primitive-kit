import { isFunction } from "~/functions/methods";

/**
 * Returns a boolean whether the given input is iterable.
 */
export function isIterable(arr: any): arr is Iterable<unknown> {
  return isFunction(arr?.[Symbol.iterator]);
}
