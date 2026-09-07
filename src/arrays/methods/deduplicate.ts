import { defineMethod } from "~/compiler";
import { isArray } from "./isArray";

export default defineMethod({
  instanceCallable: "chainable",
});

/**
 * Removes duplicate values from the array in place.
 *
 * @see https://stackoverflow.com/questions/32510114/remove-duplicates-algorithm-in-place-and-stable-javascript
 */
export function deduplicate<const T extends any[]>(arr: T): T {
  if (!isArray(arr)) {
    throw new TypeError("deduplicate called on non-array");
  }

  let seen = new Set(),
    k = 0;

  for (let i = 0; i < arr.length; i++) {
    const v = arr[i];

    if (!seen.has(v)) {
      arr[k++] = v;
      seen.add(v);
    }
  }

  arr.length = k;

  return arr;
}
