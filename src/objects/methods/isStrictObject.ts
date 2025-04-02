import type { ObjectType } from "../types";

export function isStrictObject(obj: any): obj is ObjectType {
  return !!obj && obj.constructor === Object;
}
