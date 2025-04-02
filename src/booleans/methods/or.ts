import { toBoolean } from "./toBoolean";

export function or(a: any, b: any): boolean {
  return toBoolean(a) || toBoolean(b);
}
