import type { Stringifiable, ToString } from "~/strings/types";
import { toString } from "./toString";

export function wrap<
  T extends Stringifiable,
  B extends Stringifiable,
  A extends Stringifiable
>(
  str: T,
  before: B,
  after?: A
): `${ToString<B>}${ToString<T>}${string extends ToString<A>
  ? ToString<B>
  : ToString<A>}` {
  const saneBefore = toString(before);
  const saneAfter = after ? toString(after) : saneBefore;

  return <any>(saneBefore + toString(str) + saneAfter);
}
