import { all } from "./all";

export function notAll(values: any[]): boolean {
  return !all(values);
}
