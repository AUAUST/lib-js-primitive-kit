import type { ObjectType } from "../types";
import { isObject } from "./isObject";

export function hasKey<K extends PropertyKey, T extends ObjectType | any[]>(
  key: K,
  obj: T
): obj is T & {
  [P in K]: P extends keyof T ? T[P] : unknown;
} {
  return !!obj && isObject(obj, true) && key in obj;
}
