import { isObject } from "./isObject";

export function hasKey<K extends PropertyKey, T>(
  key: K,
  obj: T
): obj is (T & object) & {
  [P in K]: P extends keyof T ? T[P] : unknown;
} {
  return !!obj && isObject(obj) && key in <object>obj;
}
