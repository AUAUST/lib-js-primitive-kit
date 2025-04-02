import { toBoolean } from "./toBoolean";

export function some(values: any[]): boolean {
  return values.some(toBoolean);
}
