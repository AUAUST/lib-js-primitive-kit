import { defineMethod } from "~/compiler";
import { and } from "./and";

export default defineMethod({
  instanceCallable: true,
});

/**
 * The logical NAND operator. Returns `true` if either `a` or `b` are falsy.
 */
export function nand(a: any, b: any): boolean {
  return !and(a, b);
}
