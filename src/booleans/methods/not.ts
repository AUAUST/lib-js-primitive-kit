import { toBoolean } from "./toBoolean";

export function not(a: any): boolean {
  return !toBoolean(a);
}
