import { or } from "./or";

export function nor(a: any, b: any): boolean {
  return !or(a, b);
}
