import { isNumber } from "~/numbers/methods";
import type { Stringifiable } from "~/strings/types";
import { decrement } from "./decrement";
import { padStart } from "./padStart";
import { toString } from "./toString";

export function increment(
  str: Stringifiable,
  options?:
    | {
        increment?: number;
        separator?: string;
        pad?: number | false;
        filler?: string;
      }
    | number
): string {
  const s = toString(str);
  const {
    increment = 1,
    separator = "",
    pad = 0,
    filler = "0",
  } = isNumber(options) ? { increment: options } : options ?? {};

  if (increment === 0) {
    return s;
  }

  if (increment < 0) {
    return decrement(s, {
      decrement: -1 * increment,
      separator,
      pad,
      filler,
    });
  }

  const current = s.match(/\d+$/)?.[0] ?? false;

  if (!current) {
    return s + separator + padStart(increment, pad || 0, filler);
  }

  return (
    s.replace(/\d+$/, "") +
    padStart(parseInt(current) + increment, pad || 0, filler)
  );
}
