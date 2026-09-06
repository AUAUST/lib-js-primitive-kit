import { defineMethod } from "~/compiler";
import { toBoolean } from "./toBoolean";

export default defineMethod({
  instanceCallable: true,
});

/**
 * The logical NOT operator. Returns the opposite of `a` converted to a boolean.
 */
export function not(a: any): boolean {
  return !toBoolean(a);
}
