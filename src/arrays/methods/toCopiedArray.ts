import type { Writable } from "~/objects/types";
import { isArray } from "./isArray";
import { toArray, type ToArrayFunction } from "./toArray";

export type ToCopiedArrayFunction = {
  <T extends readonly any[]>(arr: T): Writable<T>;
} & ToArrayFunction;

export const toCopiedArray = <ToCopiedArrayFunction>(
  function toCopiedArray(...args: Parameters<typeof Array.from>) {
    const arr = args[0];

    return isArray(arr)
      ? // If the input is an array, we copy it
        arr.slice()
      : // Otherwise, the `toArray` function already returns a new array (which we don't want to copy again)
        toArray(...args);
  }
);
