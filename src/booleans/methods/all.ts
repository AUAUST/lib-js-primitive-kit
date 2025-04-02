import { toBoolean } from "./toBoolean";

export function all(values: any[]): boolean {
  return values.every(toBoolean);
}
