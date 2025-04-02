import { some } from "./some";

export function none(values: any[]): boolean {
  return !some(values);
}
