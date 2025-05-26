import type { Stringifiable, ToString } from "~/strings/types";

export function toString<T extends Stringifiable>(str: T): ToString<T>;
export function toString(str?: unknown): string;
export function toString(str: unknown): string {
  if (str === null || str === undefined) {
    return "";
  }

  // If the passed object's `toString()` method is the one from `Object.prototype`,
  // this means no custom `toString()` method is defined and the string will be
  // in the format `[object Object]`. In this case, we call `valueOf()` first
  //  which usually provides a more meaningful representation of the object.
  if (str.toString === Object.prototype.toString) {
    str = str.valueOf();
  }

  return String(str);
}
