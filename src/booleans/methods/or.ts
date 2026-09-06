import { toBoolean } from "./toBoolean";

/**
 * The logical OR operator. Returns `true` if either `a` or `b` are truthy.
 */
export function or(a: any, b: any): boolean {
  return toBoolean(a) || toBoolean(b);
}
