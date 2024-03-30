import {
  casingOptions,
  comparisonOptions,
  randomStringOptions,
  unnaccentLigatures,
  type CasingOptions,
  type ComparisonOptions,
  type RandomStringOptions,
} from "~/strings/helpers";
import type {
  Capitalized,
  Concatenated,
  Lowercased,
  Stringifiable,
  ToString,
  Uppercased,
} from "~/strings/types";

export function toString<T extends Stringifiable>(str: T): ToString<T> {
  if (str === null || str === undefined) return "" as ToString<T>;
  return String(str) as ToString<T>;
}

export function isString(x: any): x is string {
  return typeof x === "string";
}

export function isStrictString(x: any): x is string {
  return typeof x === "string" && x !== "";
}

export function stringEquals<T extends Stringifiable>(
  str1: T,
  str2: Stringifiable,
  options?: ComparisonOptions
): str2 is Stringifiable<ToString<T>> {
  let sane1: string = toString(str1);
  let sane2: string = toString(str2);
  const {
    caseSensitive: cs,
    trim: tr,
    unaccent: ua,
  } = comparisonOptions(options);

  if (tr) (sane1 = sane1.trim()), (sane2 = sane2.trim());
  if (ua) (sane1 = unaccent(sane1)), (sane2 = unaccent(sane2));
  if (cs) return sane1 === sane2;
  return sane1.toLowerCase() === sane2.toLowerCase();
}

export function capitalize<T extends Stringifiable>(str: T): Capitalized<T> {
  const sane = toString(str);
  return (sane.charAt(0).toUpperCase() + sane.slice(1)) as Capitalized<T>;
}

export function toLowerCase<T extends Stringifiable>(str: T): Lowercased<T> {
  return toString(str).toLowerCase() as Lowercased<T>;
}

export function toUpperCase<T extends Stringifiable>(str: T): Uppercased<T> {
  return toString(str).toUpperCase() as Uppercased<T>;
}

export function toLocaleLowerCase(
  str: Stringifiable,
  locales?: string | string[] | undefined
): string {
  return toString(str).toLocaleLowerCase(locales);
}

export function toLocaleUpperCase(
  str: Stringifiable,
  locales?: string | string[] | undefined
): string {
  return toString(str).toLocaleUpperCase(locales);
}

export function toTitleCase(str: Stringifiable): string {
  return toString(str)
    .split(/\s+/)
    .map(capitalize)
    .join(" ")
    .split("-")
    .map(capitalize)
    .join("-");
}

export function toCamelCase(
  str: Stringifiable,
  options?: CasingOptions
): string {
  return splitWords(unaccent(str), options)
    .map((word, index) => {
      if (index === 0) {
        return word.toLowerCase();
      }
      return capitalize(word.toLowerCase());
    })
    .join("");
}

export function toPascalCase(
  str: Stringifiable,
  options?: CasingOptions
): string {
  return splitWords(unaccent(str), options)
    .map((word) => capitalize(word.toLowerCase()))
    .join("");
}

export function toKebabCase(
  str: Stringifiable,
  options?: CasingOptions
): string {
  return splitWords(unaccent(str), options).join("-").toLowerCase();
}

export function toSnakeCase(
  str: Stringifiable,
  options?: CasingOptions
): string {
  return splitWords(unaccent(str), options).join("_").toLowerCase();
}

export function toCustomCase(
  str: Stringifiable,
  options:
    | {
        /**
         * The string with which to separate the words in the output.
         */
        separator?: string;
        wordCase?: "lower" | "upper" | "capital" | "keep";
        firstWordCase?: "lower" | "upper" | "capital" | "keep" | "match";
        /**
         * If true,  a capital letter won't be considered as a word boundary.
         */
        ignoreCaps?: boolean;
        /**
         * If true, accents will be removed from the string before processing.
         */
        unaccent?: boolean;
      }
    | string
): string {
  const {
    separator,
    wordCase,
    firstWordCase,
    ignoreCaps,
    unaccent: ua,
  } = isString(options)
    ? {
        separator: toString(options),
        wordCase: "keep",
        firstWordCase: "match",
        ignoreCaps: undefined, // for TS
        unaccent: undefined, // for TS
      }
    : {
        separator: "",
        wordCase: "keep",
        firstWordCase: "match",
        ...options,
      };

  const toCase = (word: string, index: number): string => {
    switch (index === 0 ? firstWordCase : wordCase) {
      case "lower":
        return word.toLowerCase();
      case "upper":
        return word.toUpperCase();
      case "capital":
        return capitalize(word);
      case "keep":
        return word;
    }

    // If none matched, it's either:
    // - the first index and firstWordCase is "match", so we return the word as it would be handled as a non-first word
    // - a wrong input, so we return the word as it is
    return index === 0 ? toCase(word, -1) : word;
  };

  if (ua) str = unaccent(str);

  return splitWords(str, ignoreCaps).map(toCase).join(separator);
}

export function concat<
  T extends Stringifiable[],
  L extends { separator: Stringifiable } | Stringifiable
>(
  ...args: [...T, L]
): L extends { separator: Stringifiable }
  ? Concatenated<T, L["separator"]>
  : L extends Stringifiable
  ? Concatenated<[...T, L], "">
  : never {
  const { separator, strings } = (() => {
    if (args.length === 0) {
      return { separator: "", strings: [] };
    }
    if (args.length === 1) {
      return { separator: "", strings: [args] };
    }

    const last = args.at(-1);

    if (last instanceof Object && "separator" in last) {
      args.pop();
      return {
        separator: last.separator,
        strings: args,
      };
    }

    return { separator: "", strings: args };
  })();

  return strings.map(toString).filter(Boolean).join(toString(separator)) as any;
}

export function unaccent(str: Stringifiable): string {
  return (
    mapReplace(str, unnaccentLigatures)
      .normalize("NFKD")
      // combining diacritical marks Unicode range
      .replace(/[\u0300-\u036f]/g, "")
  );
}

export function splitWords(
  str: Stringifiable,
  options?: CasingOptions
): string[] {
  const { ignoreCaps, unaccent: ua } = casingOptions(options);
  const sane = ua ? unaccent(str) : toString(str);
  const regex = ignoreCaps
    ? /[^\p{L}\d]+/gu // will match all non-alphanumeric characters
    : /[^\p{L}\d]+|(?=[\p{Lu}])/gu; // will match all non-alphanumeric characters AND positions before a capital letter

  return sane.split(regex).filter(Boolean);
}

export function mapReplace(
  str: Stringifiable,
  map:
    | Readonly<Record<string, string>>
    | Readonly<Readonly<[string | RegExp, Stringifiable]>[]>,
  replaceAll?: boolean
) {
  let sane = toString(str);
  const entries = Array.isArray(map) ? map : Object.entries(map);

  for (const [key, value] of entries) {
    if (replaceAll && typeof key === "string") {
      sane = sane.replaceAll(key, toString(value));
      continue;
    }

    sane = sane.replace(key, toString(value));
  }

  return sane;
}

export function trim(str: Stringifiable, chars?: string | RegExp): string {
  if (!chars) return toString(str).trim();

  if (isString(chars)) {
    return toString(str).replace(
      new RegExp(`^[${chars}]+|[${chars}]+$`, "g"),
      ""
    );
  }

  if (chars instanceof RegExp) {
    return toString(str).replace(
      new RegExp(`^(${chars.source})+|(${chars.source})+$`, "g"),
      ""
    );
  }

  throw new TypeError(
    "S.trim() only accepts strings or RegExp as second argument."
  );
}

export function trimStart(str: Stringifiable, chars?: string | RegExp): string {
  if (!chars) return toString(str).trimStart();

  if (isString(chars)) {
    return toString(str).replace(new RegExp(`^[${chars}]+`, "g"), "");
  }

  if (chars instanceof RegExp) {
    return toString(str).replace(new RegExp(`^(${chars.source})+`, "g"), "");
  }

  throw new TypeError(
    "S.trimStart() only accepts strings or RegExp as second argument."
  );
}

export function trimEnd(str: Stringifiable, chars?: string | RegExp): string {
  if (!chars) return toString(str).trimEnd();

  if (isString(chars)) {
    return toString(str).replace(new RegExp(`[${chars}]+$`, "g"), "");
  }

  if (chars instanceof RegExp) {
    return toString(str).replace(new RegExp(`(${chars.source})+$`, "g"), "");
  }

  throw new TypeError(
    "S.trimEnd() only accepts strings or RegExp as second argument."
  );
}

export function padStart(
  str: Stringifiable,
  length: number,
  filler?: Stringifiable
) {
  return toString(str).padStart(length, toString(filler) || " ");
}

export function padEnd(
  str: Stringifiable,
  length: number,
  filler?: Stringifiable
) {
  return toString(str).padEnd(length, toString(filler) || " ");
}

export function truncateStart(
  str: Stringifiable,
  length: number,
  ellipsis?: Stringifiable
) {
  const sane = toString(str);
  const saneEllipsis = toString(ellipsis);

  if (sane.length <= length) return sane;
  if (saneEllipsis.length >= length)
    throw new RangeError(
      "S.truncateStart() requires the length of the ellipsis to be shorter than the maximum length of the string."
    );
  return saneEllipsis + sane.slice(sane.length - length + saneEllipsis.length);
}

export function truncateEnd(
  str: Stringifiable,
  length: number,
  ellipsis?: Stringifiable
) {
  const sane = toString(str);
  const saneEllipsis = toString(ellipsis);

  if (sane.length <= length) return sane;

  if (saneEllipsis.length >= length) {
    throw new RangeError(
      "S.truncateEnd() requires the length of the ellipsis to be shorter than the maximum length of the string."
    );
  }

  return sane.slice(0, length - saneEllipsis.length) + saneEllipsis;
}

type AfterFirst<
  T extends Stringifiable,
  U extends Stringifiable
> = ToString<T> extends `${string}${ToString<U>}${infer R}` ? R : string;

export function afterFirst<T extends Stringifiable, U extends Stringifiable>(
  str: T,
  substring: U
): AfterFirst<T, U> {
  const sane = toString(str);
  const saneSubstring = toString(substring);
  const index = sane.indexOf(saneSubstring);

  if (index === -1) return "" as any;
  return sane.slice(index + saneSubstring.length) as any;
}

export function afterLast(
  str: Stringifiable,
  substring: Stringifiable
): string {
  const sane = toString(str);
  const saneSubstring = toString(substring);
  const index = sane.lastIndexOf(saneSubstring);

  if (index === -1) return "";
  return sane.slice(index + saneSubstring.length);
}

type AfterStart<
  T extends Stringifiable,
  U extends Stringifiable
> = ToString<T> extends `${ToString<U>}${infer R}` ? R : string;

export function afterStart<T extends Stringifiable, U extends Stringifiable>(
  str: T,
  substring: U
): AfterStart<T, U> {
  const sane = toString(str);
  const saneSubstring = toString(substring);

  if (!sane.startsWith(saneSubstring)) return "" as any;
  return sane.slice(saneSubstring.length) as any;
}

type BeforeFirst<
  T extends Stringifiable,
  U extends Stringifiable
> = ToString<T> extends `${infer R}${ToString<U>}${string}` ? R : string;

export function beforeFirst<T extends Stringifiable, U extends Stringifiable>(
  str: T,
  substring: U
): BeforeFirst<T, U> {
  const sane = toString(str);
  const saneSubstring = toString(substring);
  const index = sane.indexOf(saneSubstring);

  if (index === -1) return "" as any;
  return sane.slice(0, index) as any;
}

export function beforeLast(str: Stringifiable, substring: Stringifiable) {
  const sane = toString(str);
  const saneSubstring = toString(substring);
  const index = sane.lastIndexOf(saneSubstring);

  if (index === -1) return "";
  return sane.slice(0, index);
}

type BeforeEnd<
  T extends Stringifiable,
  U extends Stringifiable
> = ToString<T> extends `${infer R}${ToString<U>}` ? R : string;

export function beforeEnd<T extends Stringifiable, U extends Stringifiable>(
  str: T,
  substring: U
): BeforeEnd<T, U> {
  const sane = toString(str);
  const saneSubstring = toString(substring);

  if (!sane.endsWith(saneSubstring)) return "" as any;
  return sane.slice(0, sane.length - saneSubstring.length) as any;
}

export function between(
  str: Stringifiable,
  startSubstring: Stringifiable,
  endSubstring: Stringifiable
) {
  const sane = toString(str);
  const saneStartSubstring = toString(startSubstring);
  const saneEndSubstring = toString(endSubstring);
  const startIndex = sane.indexOf(saneStartSubstring);
  const endIndex = sane.lastIndexOf(saneEndSubstring);

  if (startIndex === -1 || endIndex === -1) return "";
  return sane.slice(startIndex + saneStartSubstring.length, endIndex);
}

export function contains<T extends Stringifiable>(
  str: Stringifiable,
  substring: T,
  options?: ComparisonOptions
): str is `${string}${ToString<T>}${string}` {
  let sane: string = toString(str);
  let saneSubstring: string = toString(substring);
  const {
    caseSensitive: cs,
    trim: tr,
    unaccent: ua,
  } = comparisonOptions(options, { caseSensitive: true });

  if (tr) saneSubstring = saneSubstring.trim();
  if (saneSubstring === "") return true;
  if (ua) (sane = unaccent(sane)), (saneSubstring = unaccent(saneSubstring));
  if (cs) return sane.includes(saneSubstring);
  return sane.toLowerCase().includes(saneSubstring.toLowerCase());
}

export function startsWith<T extends Stringifiable>(
  str: Stringifiable,
  substring: T,
  options?: ComparisonOptions
): str is `${ToString<T>}${string}` {
  let sane: string = toString(str);
  let saneSubstring: string = toString(substring);
  const {
    caseSensitive: cs,
    trim: tr,
    unaccent: ua,
  } = comparisonOptions(options, {
    caseSensitive: true,
  });

  if (tr)
    (sane = sane.trimStart()), (saneSubstring = saneSubstring.trimStart());
  if (saneSubstring === "") return true;
  if (ua) (sane = unaccent(sane)), (saneSubstring = unaccent(saneSubstring));
  if (cs) return sane.startsWith(saneSubstring);
  return sane.toLowerCase().startsWith(saneSubstring.toLowerCase());
}

export function endsWith<T extends Stringifiable>(
  str: Stringifiable,
  substring: T,
  options?: ComparisonOptions
): str is `${string}${ToString<T>}` {
  let sane: string = toString(str);
  let saneSubstring: string = toString(substring);
  const {
    caseSensitive: cs,
    trim: tr,
    unaccent: ua,
  } = comparisonOptions(options, {
    caseSensitive: true,
  });

  if (tr) (sane = sane.trimEnd()), (saneSubstring = saneSubstring.trimEnd());
  if (saneSubstring === "") return true;
  if (ua) (sane = unaccent(sane)), (saneSubstring = unaccent(saneSubstring));
  if (cs) return sane.endsWith(saneSubstring);
  return sane.toLowerCase().endsWith(saneSubstring.toLowerCase());
}

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
  const sane = toString(str);
  const {
    increment = 1,
    separator = "",
    pad = 0,
    filler = "0",
  } = typeof options === "number" ? { increment: options } : options ?? {};

  if (increment === 0) return sane;
  if (increment < 0)
    return decrement(sane, {
      decrement: -1 * increment,
      separator,
      pad,
      filler,
    });

  const current = sane.match(/\d+$/)?.[0] ?? false;

  if (!current) return sane + separator + padStart(increment, pad || 0, filler);

  return (
    sane.replace(/\d+$/, "") +
    padStart(parseInt(current) + increment, pad || 0, filler)
  );
}

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
  } = typeof options === "number" ? { decrement: options } : options ?? {};
  const rawSane = toString(str);

  if (decrement === 0) return rawSane;
  if (decrement < 0)
    return increment(rawSane, {
      increment: -1 * decrement,
      separator,
      pad,
      filler,
    });

  const current = rawSane.match(/\d+$/)?.[0] ?? "0";
  const sane = beforeEnd(rawSane, current) || rawSane;

  if ((Number(current) || 0) - decrement < 0) {
    if (keepZero)
      return sane + separator + (pad ? padStart(0, pad, filler) : 0);

    // Trim the separator and the zero suffix.
    return separator ? trimEnd(sane, separator) : sane.replace(/\d+$/, "");
  }

  const next = parseInt(current) - decrement;
  const trimmed = separator
    ? trimEnd(sane, separator)
    : sane.replace(/\d+$/, "");

  if (next === 0 && !keepZero) return trimmed;
  return trimmed + separator + (pad ? padStart(next, pad, filler) : next);
}

export function randomString(
  options?: RandomStringOptions,
  chars?: string | number
) {
  const { length, pool } = randomStringOptions(options, chars);

  if (length === 0) return "";

  if (!isFinite(length) || length < 0)
    throw new RangeError(
      "S.random() requires a length greater than or equal to 0."
    );

  if (typeof pool === "number") {
    let result = "";

    while (result.length < length)
      result += Math.random().toString(pool).slice(2);

    return result.slice(0, length);
  }

  const pL = pool.length;

  if (pL === 1) return pool.repeat(length);

  if (pL < 1)
    throw new RangeError(
      "S.random() requires at least one character to be allowed."
    );

  const randIndex = () => Math.floor(Math.random() * pL);

  let result = "";

  for (let i = 0; i < length; i++) result += pool[randIndex()];

  return result;
}

export function repeat<T extends Stringifiable>(
  str: T,
  count: number
): `${string}${ToString<T>}${string}` {
  return toString(str).repeat(count) as any;
}

type SplitFirst<
  T extends Stringifiable,
  U extends Stringifiable
> = ToString<T> extends `${string}${ToString<U>}${string}`
  ? [BeforeFirst<T, U>, AfterFirst<T, U>]
  : [T, ""];

export function splitFirst<T extends Stringifiable, U extends Stringifiable>(
  str: Stringifiable,
  separator: Stringifiable
): SplitFirst<T, U> {
  const sane = toString(str);
  const saneSeparator = toString(separator);
  const index = sane.indexOf(saneSeparator);

  if (index === -1) return [sane, ""] as any;
  return [
    sane.slice(0, index) as any,
    sane.slice(index + saneSeparator.length) as any,
  ];
}

export function splitLast(
  str: Stringifiable,
  separator: Stringifiable
): [string, string] {
  const sane = toString(str);
  const saneSeparator = toString(separator);
  const index = sane.lastIndexOf(saneSeparator);

  if (index === -1) return [sane, ""];
  return [sane.slice(0, index), sane.slice(index + saneSeparator.length)];
}

export function splitNth(
  str: Stringifiable,
  separator: Stringifiable,
  nth: number
): [string, string] {
  const sane = toString(str);
  const saneSeparator = toString(separator);

  let index = 0;

  // -1 makes the index 0-based, so `foo:bar:baz` with nth = 1 will return `foo:bar` and `baz`
  for (let i = -1; i < nth; i++) {
    index = sane.indexOf(saneSeparator, index + 1);
    if (index === -1) return [sane, ""];
  }

  return [sane.slice(0, index), sane.slice(index + saneSeparator.length)];
}
