import { toBoolean } from "./toBoolean";

export function toString(value: any): string {
  return toBoolean(value) ? "true" : "false";
}
