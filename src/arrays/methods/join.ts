import type { Arrayable } from "~/arrays/types";
import { defineMethod } from "~/compiler";
import type { Concatenated, Stringifiable } from "~/strings";
import { toString } from "~/strings/methods";
import type { ToArray } from "~/arrays/types";
import { toArray } from "./toArray";

export default defineMethod({
  instanceCallable: true,
});

export function join<
  const T extends Arrayable<Stringifiable>,
  const S extends Stringifiable,
>(array: T, separator?: S): Concatenated<ToArray<T>, S>;
export function join(
  array: Arrayable<Stringifiable>,
  separator?: Stringifiable,
) {
  return toArray(array).join(
    separator === undefined ? undefined : toString(separator),
  );
}
