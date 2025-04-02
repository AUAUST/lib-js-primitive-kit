import type { IfNever } from "type-fest";
import { isArray } from "~/arrays/methods";
import type { ObjectType } from "../types";

export type ToObject<T> = T extends null | undefined
  ? ObjectType
  : T extends (infer R)[]
  ? IfNever<R, ObjectType, { [K: `${number}`]: ToObject<R> }>
  : T extends number
  ? Number
  : T extends string
  ? String
  : T extends boolean
  ? Boolean
  : T;

export function toObject<T>(obj: T): ToObject<T> {
  return isArray(obj) ? <ToObject<T>>Object.assign({}, obj) : Object(obj);
}
