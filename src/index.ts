export { A, A as Arr } from "~/arrays";
export { B, B as Bool } from "~/booleans";
export { F, F as Func } from "~/functions";
export { N, N as Num } from "~/numbers";
export { O, O as Obj } from "~/objects";
export { P } from "~/primitives";
export { S, S as Str } from "~/strings";

export type { ToArray } from "~/arrays";
export type { AsyncFn, Fn } from "~/functions";
export type { Numberifiable, ToNumber } from "~/numbers";
export type { Stringifiable, ToString } from "~/strings";

export { a, b, createProxy, n, o, proxied, s } from "~/proxy";

export type {
  Proxied,
  ProxiedArray,
  ProxiedBoolean,
  ProxiedNumber,
  ProxiedObject,
  ProxiedString,
  ProxiedTarget,
} from "~/proxy";
