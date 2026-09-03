import { isArray } from "~/arrays/methods";
import type { ObjectType } from "../types";

/**
 * Simple is-object check, to avoid repeating `typeof x === "object" && x !== null`.
 *
 * Returns `false` for `null` and other primitive values.
 * Returns `false` for functions.
 * Returns `true` class instances.
 * Returns `true` or `false` for arrays depending on the value of `allowArray`.
 */
export function isObject(
  obj: any,
  allowArray: true,
): obj is ObjectType | unknown[];
export function isObject(obj: any, allowArray?: false): obj is ObjectType;
export function isObject(obj: any, allowArray: boolean): boolean;
export function isObject(obj: any, allowArray: boolean = false): boolean {
  return !!obj && typeof obj === "object" && (allowArray || !isArray(obj));
}
