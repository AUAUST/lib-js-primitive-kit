import { toBoolean } from "./toBoolean";

export function xnor(a: any, b: any): boolean {
  return toBoolean(a) === toBoolean(b);
}
