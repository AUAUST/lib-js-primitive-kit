import { ExpectedArrayError } from "~/arrays/helpers";
import { isArray } from "./isArray";

export function collapse<T extends any[]>(arr: T): T {
  if (!isArray(arr)) {
    throw new ExpectedArrayError();
  }

  const keys = Object.keys(arr); // Object.keys() returns only keys that are set, i.e. [,,1,,2] would return ["2", "4"]
  let i = 0;

  for (const key of keys) {
    arr[i++] = arr[key as keyof T];
  }

  arr.length = i;

  return arr;
}
