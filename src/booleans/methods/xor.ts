import { defineMethod } from "~/compiler";
import { toBoolean } from "./toBoolean";

export default defineMethod({
  instanceCallable: true,
});

/**
 * The logical XOR operator. Returns `true` if either `a` or `b` are truthy, but not both nor neither.
 */
export function xor(a: any, b: any): boolean {
  return toBoolean(a) !== toBoolean(b);
}
