import { ExpectedArrayError } from "~/arrays/helpers";
import { isArray } from "./isArray";

export function reverse<T extends any[]>(arr: T): T[keyof T & number][] {
  if (!isArray(arr)) {
    throw new ExpectedArrayError();
  }

  return arr.reverse();
}
