import type { IfNever } from "type-fest";
import { isArray } from "~/arrays/methods";

export type ToObject<T> = T extends null | undefined
  ? Record<string, unknown>
  : T extends (infer R)[]
  ? IfNever<R, Record<string, unknown>, { [K: `${number}`]: ToObject<R> }>
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
