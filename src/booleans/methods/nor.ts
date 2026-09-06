import { defineMethod } from "~/compiler";
import { or } from "./or";

export default defineMethod({
  instanceCallable: true,
});

/**
 * The logical NOR operator. Returns `true` if both `a` and `b` are falsy.
 */
export function nor(a: any, b: any): boolean {
  return !or(a, b);
}
