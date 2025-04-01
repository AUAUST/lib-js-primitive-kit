import { isNumber } from "~/numbers/methods";
import type { Stringifiable } from "~/strings/types";
import { beforeEnd } from "./beforeEnd";
import { increment } from "./increment";
import { padStart } from "./padStart";
import { toString } from "./toString";
import { trimEnd } from "./trimEnd";

export function decrement(
  str: Stringifiable,
  options?:
    | {
        /** If false and the decrement results in zero, the suffix will be removed. If true, uses 0 as the suffix. */
        keepZero?: boolean;
        decrement?: number;
        separator?: string;
        pad?: number | false;
        filler?: string;
      }
    | number
) {
  const {
    keepZero = false,
    decrement = 1,
    separator = "",
    pad = false,
    filler = "0",
  } = isNumber(options) ? { decrement: options } : options ?? {};
  let s: string = toString(str);

  if (decrement === 0) {
    return s;
  }

  if (decrement < 0) {
    return increment(s, {
      increment: -1 * decrement,
      separator,
      pad,
      filler,
    });
  }

  const current = s.match(/\d+$/)?.[0] ?? "0";
  s = beforeEnd(s, current) || s;

  if ((Number(current) || 0) - decrement < 0) {
    if (keepZero) {
      return s + separator + (pad ? padStart(0, pad, filler) : 0);
    }

    // Trim the separator and the zero suffix.
    return separator ? trimEnd(s, separator) : s.replace(/\d+$/, "");
  }

  const next = parseInt(current) - decrement;
  const trimmed = separator ? trimEnd(s, separator) : s.replace(/\d+$/, "");

  if (next === 0 && !keepZero) {
    return trimmed;
  }

  return trimmed + separator + (pad ? padStart(next, pad, filler) : next);
}
