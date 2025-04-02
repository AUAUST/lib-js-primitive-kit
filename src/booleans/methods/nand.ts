import { and } from "./and";

export function nand(a: any, b: any): boolean {
  return !and(a, b);
}
