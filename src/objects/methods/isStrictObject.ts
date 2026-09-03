import type { ObjectType } from "../types";

/**
 * Returns a boolean whether the given input is an object.
 *
 * Returns `false` for `null`, class instances, functions, arrays and all primitive types.
 */
export function isStrictObject(obj: any): obj is ObjectType {
  return !!obj && obj.constructor === Object;
}
