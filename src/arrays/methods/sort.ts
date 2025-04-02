import { ExpectedArrayError } from "~/arrays/helpers";
import { isArray } from "./isArray";

export function sort<T>(arr: T[], compareFn?: (a: T, b: T) => number): T[] {
  if (!isArray(arr)) {
    throw new ExpectedArrayError();
  }

  return arr.sort(compareFn);
}
