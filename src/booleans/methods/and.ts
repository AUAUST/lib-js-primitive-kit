import { toBoolean } from "./toBoolean";

export function and(a: any, b: any): boolean {
  return toBoolean(a) && toBoolean(b);
}
