import { defineMethod } from "~/compiler";
import { toBoolean } from "./toBoolean";

export default defineMethod({
  instanceCallable: true,
});

/**
 * The logical OR operator. Returns `true` if either `a` or `b` are truthy.
 */
export function or(a: any, b: any): boolean {
  return toBoolean(a) || toBoolean(b);
}
