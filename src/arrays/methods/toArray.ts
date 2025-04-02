import type { Arrayable, ToArray } from "~/arrays/types";
import { isNumber } from "~/numbers/methods";
import { isArray } from "./isArray";

export type ToArrayFunction = {
  (input?: null | undefined): unknown[];
  <T>(length: number, mapFn?: (v: undefined, k: number) => T): T[];
  <T extends Arrayable>(arrayLike: T): ToArray<T>;
} & typeof Array.from;

export const toArray = function toArray(
  ...args: Parameters<typeof Array.from>
) {
  const arr = args[0];

  if (arr === undefined || arr === null) {
    return [];
  }

  if (isArray(arr)) {
    return arr;
  }

  if (isNumber(arr)) {
    args[0] = { length: arr };
  }

  return Array.from(...args);
} as ToArrayFunction;
