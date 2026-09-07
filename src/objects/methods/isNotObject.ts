import { defineMethod } from "~/compiler";
import type { GenericRecord } from "~/shared/types";
import { isObject } from "./isObject";

export default defineMethod({
  methodAliases: ["isNot"],
});

/**
 * Checks if a value is not an object.
 */
export function isNotObject<const T>(
  value: T,
  allowArray?: false,
): value is Exclude<T, GenericRecord>;
export function isNotObject<const T>(
  value: T,
  allowArray: true,
): value is Exclude<T, GenericRecord | unknown[]>;
export function isNotObject<const T>(
  value: T,
  allowArray = false,
): value is Exclude<T, object> {
  return !isObject(value, allowArray);
}
