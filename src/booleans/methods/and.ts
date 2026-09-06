import { toBoolean } from "./toBoolean";

/**
 * The logical AND operator. Returns `true` if both `a` and `b` are truthy.
 */
export function and(a: any, b: any): boolean {
  return toBoolean(a) && toBoolean(b);
}
