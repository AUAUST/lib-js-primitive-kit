import { toBoolean } from "./toBoolean";

export function xor(a: any, b: any): boolean {
  return toBoolean(a) !== toBoolean(b);
}
