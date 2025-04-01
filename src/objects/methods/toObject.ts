import { isArray } from "~/arrays/methods";
import type { ToObject } from "~/objects/types";

export function toObject<T>(obj: T): ToObject<T> {
  return isArray(obj) ? <ToObject<T>>Object.assign({}, obj) : Object(obj);
}
