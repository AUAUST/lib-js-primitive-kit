import { defineMethod } from "~/compiler";
import type { Stringifiable, ToString } from "~/strings/types";
import { toString } from "./toString";

export default defineMethod({
  instanceCallable: "chainable",
});

/**
 * Wraps the first string in the second string. If a third string is provided, it will be used as the closing wrapper.
 */
export function wrap<const T extends Stringifiable, const B extends Stringifiable>(
  str: T,
  wrapper: B,
): `${ToString<B>}${ToString<T>}${ToString<B>}`;
export function wrap<
  const T extends Stringifiable,
  const B extends Stringifiable,
  const A extends Stringifiable,
>(str: T, before: B, after: A): `${ToString<B>}${ToString<T>}${ToString<A>}`;
export function wrap(
  str: Stringifiable,
  before: Stringifiable,
  after?: Stringifiable,
): string;
export function wrap(
  str: Stringifiable,
  before: Stringifiable,
  after?: Stringifiable,
): string {
  before = toString(before);
  after = arguments.length > 2 ? toString(after) : before;

  return before + toString(str) + after;
}
