import { isArray } from "~/arrays/methods";

export function isObject(
  obj: any,
  allowArray: false
): obj is Record<string, unknown>;
export function isObject(
  obj: any,
  allowArray?: true
): obj is Record<string, unknown> | unknown[];
export function isObject(obj: any, allowArray?: boolean): boolean {
  return !!obj && typeof obj === "object" && (allowArray || !isArray(obj));
}
