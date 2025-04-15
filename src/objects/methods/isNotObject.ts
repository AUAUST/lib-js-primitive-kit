import type { ObjectType } from "../types";
import { isObject } from "./isObject";

export function isNotObject<T>(
  value: T,
  allowArray?: false
): value is Exclude<T, ObjectType>;
export function isNotObject<T>(
  value: T,
  allowArray: true
): value is Exclude<T, ObjectType | any[]>;
export function isNotObject<T>(
  value: T,
  allowArray = false
): value is Exclude<T, object> {
  return !isObject(value, allowArray);
}
