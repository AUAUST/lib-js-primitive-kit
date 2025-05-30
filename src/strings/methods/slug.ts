import type { CasingOptions } from "~/strings/helpers";
import { mapReplace } from "~/strings/methods/mapReplace";
import { splitWords } from "~/strings/methods/splitWords";
import { toString } from "~/strings/methods/toString";
import type { Stringifiable } from "~/strings/types";
import { isString } from "./isString";
import { only } from "./only";

export function slug(
  str: Stringifiable,
  options?:
    | string
    | (Pick<Exclude<CasingOptions, boolean>, "ignoreCaps"> & {
        separator?: Stringifiable;
        replacements?: Parameters<typeof mapReplace>[1];
        chars?: Parameters<typeof only>[1];
      })
): string {
  if (isString(options)) {
    options = { separator: options };
  }

  if (options?.replacements) {
    str = mapReplace(str, options.replacements, true);
  }

  options = {
    ignoreCaps: options?.ignoreCaps ?? true,
    separator: options?.separator ?? "-",
    chars: options?.chars ?? /\p{L}|\p{N}/u,
  };

  const words = splitWords(str, options);

  if (words.length === 0) {
    return "";
  }

  return words
    .map((word) => {
      return only(word.toLowerCase(), options.chars!);
    })
    .filter(Boolean)
    .join(toString(options.separator));
}
