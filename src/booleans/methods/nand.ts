import { and } from "./and";

/**
 * The logical NAND operator. Returns `true` if either `a` or `b` are falsy.
 */
export function nand(a: any, b: any): boolean {
  return !and(a, b);
}
