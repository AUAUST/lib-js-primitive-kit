import { isArray } from "./isArray";

export function collapse<T extends any[]>(arr: T): T;
export function collapse(arr: any[]): any[] {
  if (!isArray(arr)) {
    throw new TypeError("collapse called on non-array");
  }

  const keys = Object.keys(arr); // Object.keys() returns only keys that are set, i.e. [,,1,,2] would return ["2", "4"]
  let i = 0;

  for (const key of keys) {
    arr[i++] = arr[+key]; // +key ensures we convert the string key to a number
  }

  arr.length = i;

  return arr;
}
