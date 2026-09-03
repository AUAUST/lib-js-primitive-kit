import { toBoolean } from "./toBoolean";

/** The logical XNOR operator. Returns `true` if either both `a` and `b` are truthy or both are falsy. */
export function xnor(a: any, b: any): boolean {
  return toBoolean(a) === toBoolean(b);
}
