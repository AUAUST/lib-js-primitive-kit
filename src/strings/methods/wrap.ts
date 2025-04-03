import type { Stringifiable, ToString } from "~/strings/types";
import { toString } from "./toString";

export function wrap<T extends Stringifiable, B extends Stringifiable>(
  str: T,
  wrapper: B
): `${ToString<B>}${ToString<T>}${ToString<B>}`;
export function wrap<
  T extends Stringifiable,
  B extends Stringifiable,
  A extends Stringifiable
>(str: T, before: B, after: A): `${ToString<B>}${ToString<T>}${ToString<A>}`;
export function wrap(
  str: Stringifiable,
  before: Stringifiable,
  after?: Stringifiable
): string;
export function wrap(
  str: Stringifiable,
  before: Stringifiable,
  after?: Stringifiable
): string {
  before = toString(before);
  after = arguments.length > 2 ? toString(after) : before;

  return before + toString(str) + after;
}
