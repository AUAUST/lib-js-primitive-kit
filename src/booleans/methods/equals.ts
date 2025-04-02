import { toBoolean } from "./toBoolean";

export function equals(a: any, b: any): boolean {
  return toBoolean(a) === toBoolean(b);
}
