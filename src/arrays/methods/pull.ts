import { isFunction } from "~/functions/methods";
import { isArray } from "./isArray";

/**
 * Removes the specified values from the array.
 * If a single value is passed, all occurrences of that value are removed and the count of removed values is returned.
 * If an array of values is passed, the values contained in the array are removed from the original array
 * and a new array is returned containing the removed values.
 * If a callback is passed, the callback is called for each value in the array.
 * If the callback returns true, the value is removed from the original array and included in the new array that is returned.
 */
export function pull<T>(array: T[], value: T): number;
export function pull<T>(array: T[], values: T[]): T[];
export function pull<T>(array: T[], predicate: (value: T) => boolean): T[];
export function pull<T>(
  array: T[],
  valueOrValuesOrPredicate: T | T[] | ((value: T) => boolean),
): T | T[] | number {
  if (isFunction(valueOrValuesOrPredicate)) {
    const predicate = valueOrValuesOrPredicate;
    const removed = [];

    // Iterate backwards to avoid skipping elements when splicing
    for (let i = array.length - 1; i >= 0; i--) {
      if (predicate(array[i])) {
        removed.unshift(array[i]); // Unshift to maintain the original order
        array.splice(i, 1);
      }
    }

    return removed;
  }

  if (isArray(valueOrValuesOrPredicate)) {
    const values = new Set(valueOrValuesOrPredicate);
    const removed: T[] = [];

    // Iterate backwards to avoid skipping elements when splicing
    for (let i = array.length - 1; i >= 0; i--) {
      if (values.has(array[i])) {
        removed.unshift(array[i]); // Unshift to maintain the original order
        array.splice(i, 1);
      }
    }

    return removed;
  }

  const value = valueOrValuesOrPredicate;
  let count = 0;

  for (let i = array.length - 1; i >= 0; i--) {
    if (array[i] === value) {
      count++;
      array.splice(i, 1);
    }
  }

  return count;
}
