import { ExpectedArrayError } from "~/arrays/helpers";
import { isArray } from "./isArray";

// https://stackoverflow.com/questions/32510114/remove-duplicates-algorithm-in-place-and-stable-javascript
export function deduplicate<T extends any[]>(arr: T): T {
  if (!isArray(arr)) {
    throw new ExpectedArrayError();
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
