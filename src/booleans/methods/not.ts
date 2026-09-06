import { toBoolean } from "./toBoolean";

/**
 * The logical NOT operator. Returns the opposite of `a` converted to a boolean.
 */
export function not(a: any): boolean {
  return !toBoolean(a);
}
