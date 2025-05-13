export { A, A as Arr } from "~/arrays";
export { B, B as Bool } from "~/booleans";
export { F, F as Func } from "~/functions";
export { N, N as Num } from "~/numbers";
export { O, O as Obj } from "~/objects";
export { P } from "~/primitives";
export { S, S as Str } from "~/strings";

export type { ToArray } from "~/arrays";
export type { AsyncFn, Constructor, Fn } from "~/functions";
export type { Numberifiable, ToNumber } from "~/numbers";
export type {
  ObjectType,
  ToObject,
  Writable,
  WritableRecursive,
} from "~/objects";
export type { Stringifiable, ToString } from "~/strings";

export {
  a,
  a as arr,
  b,
  b as bool,
  createProxy,
  n,
  n as num,
  o,
  o as obj,
  proxied,
  s,
  s as str,
} from "~/proxy";

export type {
  Proxied,
  ProxiedArray,
  ProxiedBoolean,
  ProxiedNumber,
  ProxiedObject,
  ProxiedString,
  ProxyTarget,
} from "~/proxy";
