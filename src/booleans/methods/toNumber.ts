import { toBoolean } from "./toBoolean";

export function toNumber(value: any): number {
  return toBoolean(value) ? 1 : 0;
}
