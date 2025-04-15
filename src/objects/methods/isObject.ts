import { isArray } from "~/arrays/methods";
import type { ObjectType } from "../types";

export function isObject(
  obj: any,
  allowArray: true
): obj is ObjectType | unknown[];
export function isObject(obj: any, allowArray?: false): obj is ObjectType;
export function isObject(obj: any, allowArray: boolean): boolean;
export function isObject(obj: any, allowArray: boolean = false): boolean {
  return !!obj && typeof obj === "object" && (allowArray || !isArray(obj));
}
