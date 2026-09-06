import { defineMethod } from "~/compiler";
import type { ObjectType } from "../types";
import { isObject } from "./isObject";

export default defineMethod({
  methodAliases: ["isNot"],
});

/**
 * Checks if a value is not an object.
 */
export function isNotObject<T>(
  value: T,
  allowArray?: false,
): value is Exclude<T, ObjectType>;
export function isNotObject<T>(
  value: T,
  allowArray: true,
): value is Exclude<T, ObjectType | any[]>;
export function isNotObject<T>(
  value: T,
  allowArray = false,
): value is Exclude<T, object> {
  return !isObject(value, allowArray);
}
