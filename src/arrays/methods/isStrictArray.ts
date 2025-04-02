import { isArray } from "./isArray";

export function isStrictArray(arr: any): arr is any[] {
  return isArray(arr) && arr.length > 0;
}
