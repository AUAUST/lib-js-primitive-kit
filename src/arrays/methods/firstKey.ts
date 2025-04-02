import { isArray } from "./isArray";

export function firstKey(arr: []): number | undefined; // While we know undefined will be returned, including number makes it more convenient to use
export function firstKey(arr: (void | never | undefined)[]): number | undefined;
export function firstKey(arr: unknown[]): number;
export function firstKey(arr: unknown[]): number | undefined {
  if (!isArray(arr)) {
    throw new TypeError("firstKey called on non-array");
  }

  let key: number | undefined;

  // This ensures empty array entries are skipped.
  // An array might start with a number of empty entries (`[, , , 1]`),
  // in which case the 0th entry is not the first key.
  // `[].some` happens to be a function that both iterates only over non-empty entries
  // and allows to short-circuit.
  // Setting `key` within the callback and returning `true` gets the first non-empty entry,
  // and stops the iteration straight away.
  arr.some((_, k) => ((key = k), true));

  return key;
}
