import { defineMethod } from "~/compiler";
import type { GenericRecord } from "~/shared/types";

export default defineMethod({
  methodAliases: ["isStrict", "isPlain"],
  helperAliases: ["isStrictObject"],
  instanceCallable: true,
});

/**
 * Returns a boolean whether the given input is an object.
 *
 * Returns `false` for `null`, class instances, functions, arrays and all primitive types.
 */
export function isPlainObject(obj: any): obj is GenericRecord {
  return !!obj && Object.getPrototypeOf(obj) === Object.prototype;
}
