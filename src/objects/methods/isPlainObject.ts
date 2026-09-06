import { defineMethod } from "~/compiler";
import type { ObjectType } from "../types";

export default defineMethod({
  staticAliases: ["isStrict", "isPlain"],
  helperAliases: ["isStrictObject"],
});

/**
 * Returns a boolean whether the given input is an object.
 *
 * Returns `false` for `null`, class instances, functions, arrays and all primitive types.
 */
export function isPlainObject(obj: any): obj is ObjectType {
  return !!obj && Object.getPrototypeOf(obj) === Object.prototype;
}
