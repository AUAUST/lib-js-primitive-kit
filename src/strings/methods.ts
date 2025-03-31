import {
  casingOptions,
  comparisonOptions,
  concatOptions,
  randomStringOptions,
  unnaccentLigatures,
  type CasingOptions,
  type ComparisonOptions,
  type RandomStringOptions,
} from "~/strings/helpers";
import type {
  Capitalized,
  Concatenated,
  Decapitalize,
  Lowercased,
  Stringifiable,
  ToString,
  Uppercased,
} from "~/strings/types";

export function toString<T extends Stringifiable | unknown>(
  str: T
): T extends Stringifiable ? ToString<T> : string {
  if (str === null || str === undefined) {
    return <any>"";
  }

  return <any>String(str);
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
  let s1: string = toString(str1);
  let s2: string = toString(str2);

  const {
    caseSensitive,
    trim,
    unaccent: unaccented,
  } = comparisonOptions(options);

  if (trim) {
    s1 = s1.trim();
    s2 = s2.trim();
  }

  if (unaccented) {
    s1 = unaccent(s1);
    s2 = unaccent(s2);
  }

  if (caseSensitive) {
    return s1 === s2;
  }

  return s1.toLowerCase() === s2.toLowerCase();
}

export function capitalize<T extends Stringifiable>(str: T): Capitalized<T> {
  const s = toString(str);
  return (s.charAt(0).toUpperCase() + s.slice(1)) as Capitalized<T>;
}

export function capitalizeWords(str: Stringifiable): string {
  return toString(str).split(/\s+/).map(capitalize).join(" ");
}

export function decapitalize<T extends Stringifiable>(str: T): Decapitalize<T> {
  const s = toString(str);
  return (s.charAt(0).toLowerCase() + s.slice(1)) as Decapitalize<T>;
}

export function decapitalizeWords(str: Stringifiable): string {
  return toString(str).split(/\s+/).map(decapitalize).join(" ");
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
  return splitWords(str, options)
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
  return splitWords(str, options)
    .map((word) => capitalize(word.toLowerCase()))
    .join("");
}

export function toKebabCase(
  str: Stringifiable,
  options?: CasingOptions
): string {
  return splitWords(str, options).join("-").toLowerCase();
}

export function toSnakeCase(
  str: Stringifiable,
  options?: CasingOptions
): string {
  return splitWords(str, options).join("_").toLowerCase();
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
    unaccent: unaccented,
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

  if (unaccented) {
    str = unaccent(str);
  }

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
  const { separator, strings } = concatOptions(args);

  return <any>strings.map(toString).filter(Boolean).join(separator);
}

export function prepend<
  T extends Stringifiable,
  P extends Stringifiable[],
  L extends { separator: Stringifiable } | Stringifiable
>(
  str: T,
  ...args: [...P, L]
): L extends { separator: Stringifiable }
  ? Concatenated<[...P, T], L["separator"]>
  : L extends Stringifiable
  ? Concatenated<[...P, T, L], "">
  : never {
  const { separator, strings } = concatOptions(args);

  return <any>(
    [...strings.map(toString).filter(Boolean), toString(str)].join(separator)
  );
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
  const { ignoreCaps, unaccent: unaccented } = casingOptions(options);
  const s = unaccented ? unaccent(str) : toString(str);
  const regex = ignoreCaps
    ? /[^\p{L}\d]+/gu // will match all non-alphanumeric characters
    : /[^\p{L}\d]+|(?=[\p{Lu}])/gu; // will match all non-alphanumeric characters AND positions before a capital letter

  return s.split(regex).filter(Boolean);
}

export function mapReplace(
  str: Stringifiable,
  map:
    | Readonly<Record<string, string>>
    | Readonly<Readonly<[string | RegExp, Stringifiable]>[]>,
  replaceAll?: boolean
) {
  let s = toString(str);
  const entries = Array.isArray(map) ? map : Object.entries(map);

  for (const [key, value] of entries) {
    if (replaceAll && typeof key === "string") {
      s = s.replaceAll(key, toString(value));
      continue;
    }

    s = s.replace(key, toString(value));
  }

  return s;
}

export function trim(str: Stringifiable, chars?: string | RegExp): string {
  if (!chars) {
    return toString(str).trim();
  }

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
  if (!chars) {
    return toString(str).trimStart();
  }

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
  if (!chars) {
    return toString(str).trimEnd();
  }

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
  const s = toString(str);
  const ell = toString(ellipsis);

  if (s.length <= length) {
    return s;
  }

  if (ell.length >= length) {
    throw new RangeError(
      "S.truncateStart() requires the length of the ellipsis to be shorter than the maximum length of the string."
    );
  }

  return ell + s.slice(s.length - length + ell.length);
}

export function truncateEnd(
  str: Stringifiable,
  length: number,
  ellipsis?: Stringifiable
) {
  const s = toString(str);
  const ell = toString(ellipsis);

  if (s.length <= length) {
    return s;
  }

  if (ell.length >= length) {
    throw new RangeError(
      "S.truncateEnd() requires the length of the ellipsis to be shorter than the maximum length of the string."
    );
  }

  return s.slice(0, length - ell.length) + ell;
}

type AfterFirst<
  T extends Stringifiable,
  U extends Stringifiable
> = ToString<T> extends `${string}${ToString<U>}${infer R}` ? R : string;

export function afterFirst<T extends Stringifiable, U extends Stringifiable>(
  str: T,
  substring: U
): AfterFirst<T, U> {
  const s1 = toString(str);
  const s2 = toString(substring);
  const i = s1.indexOf(s2);

  if (i === -1) {
    return <any>"";
  }

  return <any>s1.slice(i + s2.length);
}

export function afterLast(
  str: Stringifiable,
  substring: Stringifiable
): string {
  const s1 = toString(str);
  const s2 = toString(substring);
  const i = s1.lastIndexOf(s2);

  if (i === -1) {
    return "";
  }

  return s1.slice(i + s2.length);
}

type AfterStart<
  T extends Stringifiable,
  U extends Stringifiable
> = ToString<T> extends `${ToString<U>}${infer R}` ? R : string;

export function afterStart<T extends Stringifiable, U extends Stringifiable>(
  str: T,
  substring: U
): AfterStart<T, U> {
  const s1 = toString(str);
  const s2 = toString(substring);

  if (!s1.startsWith(s2)) {
    return <any>"";
  }

  return <any>s1.slice(s2.length);
}

type BeforeFirst<
  T extends Stringifiable,
  U extends Stringifiable
> = ToString<T> extends `${infer R}${ToString<U>}${string}` ? R : string;

export function beforeFirst<T extends Stringifiable, U extends Stringifiable>(
  str: T,
  substring: U
): BeforeFirst<T, U> {
  const s1 = toString(str);
  const s2 = toString(substring);
  const i = s1.indexOf(s2);

  if (i === -1) {
    return <any>"";
  }

  return <any>s1.slice(0, i);
}

export function beforeLast(str: Stringifiable, substring: Stringifiable) {
  const s1 = toString(str);
  const s2 = toString(substring);
  const i = s1.lastIndexOf(s2);

  if (i === -1) {
    return "";
  }

  return s1.slice(0, i);
}

type BeforeEnd<
  T extends Stringifiable,
  U extends Stringifiable
> = ToString<T> extends `${infer R}${ToString<U>}` ? R : string;

export function beforeEnd<T extends Stringifiable, U extends Stringifiable>(
  str: T,
  substring: U
): BeforeEnd<T, U> {
  const s1 = toString(str);
  const s2 = toString(substring);

  if (!s1.endsWith(s2)) {
    return <any>"";
  }

  return <any>s1.slice(0, s1.length - s2.length);
}

export function between(
  str: Stringifiable,
  startSubstring: Stringifiable,
  endSubstring: Stringifiable
) {
  const s1 = toString(str);
  const s2 = toString(startSubstring);
  const s3 = toString(endSubstring);
  const i1 = s1.indexOf(s2);
  const i2 = s1.lastIndexOf(s3);

  if (i1 === -1 || i2 === -1) {
    return "";
  }

  return s1.slice(i1 + s2.length, i2);
}

export function contains<T extends Stringifiable>(
  str: Stringifiable,
  substring: T,
  options?: ComparisonOptions
): str is `${string}${ToString<T>}${string}` {
  let s1: string = toString(str);
  let s2: string = toString(substring);
  const {
    caseSensitive,
    trim,
    unaccent: unaccented,
  } = comparisonOptions(options, { caseSensitive: true });

  if (trim) {
    s2 = s2.trim();
  }

  if (s2 === "") {
    return true;
  }

  if (unaccented) {
    s1 = unaccent(s1);
    s2 = unaccent(s2);
  }

  if (caseSensitive) {
    return s1.includes(s2);
  }

  return s1.toLowerCase().includes(s2.toLowerCase());
}

export function startsWith<T extends Stringifiable>(
  str: Stringifiable,
  substring: T,
  options?: ComparisonOptions
): str is `${ToString<T>}${string}` {
  let s1: string = toString(str);
  let s2: string = toString(substring);
  const {
    caseSensitive,
    trim,
    unaccent: unaccented,
  } = comparisonOptions(options, {
    caseSensitive: true,
  });

  if (trim) {
    s1 = s1.trimStart();
    s2 = s2.trimStart();
  }

  if (s2 === "") {
    return true;
  }

  if (unaccented) {
    s1 = unaccent(s1);
    s2 = unaccent(s2);
  }

  if (caseSensitive) {
    return s1.startsWith(s2);
  }

  return s1.toLowerCase().startsWith(s2.toLowerCase());
}

export function endsWith<T extends Stringifiable>(
  str: Stringifiable,
  substring: T,
  options?: ComparisonOptions
): str is `${string}${ToString<T>}` {
  let s1: string = toString(str);
  let s2: string = toString(substring);
  const {
    caseSensitive,
    trim,
    unaccent: unaccented,
  } = comparisonOptions(options, {
    caseSensitive: true,
  });

  if (trim) {
    s1 = s1.trimEnd();
    s2 = s2.trimEnd();
  }

  if (s2 === "") {
    return true;
  }

  if (unaccented) {
    s1 = unaccent(s1);
    s2 = unaccent(s2);
  }

  if (caseSensitive) {
    return s1.endsWith(s2);
  }

  return s1.toLowerCase().endsWith(s2.toLowerCase());
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
  const s = toString(str);
  const {
    increment = 1,
    separator = "",
    pad = 0,
    filler = "0",
  } = typeof options === "number" ? { increment: options } : options ?? {};

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

export function randomString(
  options?: RandomStringOptions,
  chars?: string | number
) {
  const { length, pool } = randomStringOptions(options, chars);

  if (length === 0) {
    return "";
  }

  if (!isFinite(length) || length < 0) {
    throw new RangeError(
      "S.random() requires a length greater than or equal to 0."
    );
  }

  if (typeof pool === "number") {
    let result = "";

    while (result.length < length) {
      result += Math.random().toString(pool).slice(2);
    }

    return result.slice(0, length);
  }

  const pL = pool.length;

  if (pL === 1) {
    return pool.repeat(length);
  }

  if (pL < 1) {
    throw new RangeError(
      "S.random() requires at least one character to be allowed."
    );
  }

  const randIndex = () => Math.floor(Math.random() * pL);

  let result = "";

  for (let i = 0; i < length; i++) {
    result += pool[randIndex()];
  }

  return result;
}

export function repeat<T extends Stringifiable>(
  str: T,
  count: number
): `${string}${ToString<T>}${string}` {
  return <any>toString(str).repeat(count);
}

type Split<S extends string, D extends string> = string extends S
  ? string[]
  : S extends ""
  ? []
  : S extends `${infer T}${D}${infer U}`
  ? [T, ...Split<U, D>]
  : [S];

export function split<S extends Stringifiable, D extends Stringifiable>(
  str: S,
  separator?: D,
  limit?: number
): Split<ToString<S>, ToString<D>> {
  const s1 = toString(str);

  if (limit === 1) {
    return <any>[s1];
  }

  const s2 = toString(separator);

  if (!limit || limit < 0) {
    return <any>s1.split(s2);
  }

  // We use a custom implementation to handle limits, because the native split
  // "splits everything and trim to the limit", which means we lose the last part of our string.
  // i.e., "a,b,c,d".split(",", 2) => ["a", "b"], where we want ["a", "b,c,d"].

  const parts = s1.split(s2);

  if (parts.length <= limit) {
    return <any>parts;
  }

  const overflow = parts.slice(limit - 1).join(s2);

  parts.length = limit - 1;
  parts.push(overflow);

  return <any>parts;
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
  const s1 = toString(str);
  const s2 = toString(separator);
  const i = s1.indexOf(s2);

  if (i === -1) {
    return <any>[s1, ""];
  }

  return <any>[s1.slice(0, i), s1.slice(i + s2.length)];
}

export function splitLast(
  str: Stringifiable,
  separator: Stringifiable
): [string, string] {
  const s1 = toString(str);
  const s2 = toString(separator);
  const i = s1.lastIndexOf(s2);

  if (i === -1) {
    return [s1, ""];
  }

  return [s1.slice(0, i), s1.slice(i + s2.length)];
}

export function nthIndexOf(
  str: Stringifiable,
  substring: Stringifiable,
  nth: number
): number {
  const s1 = toString(str);
  const s2 = toString(substring);

  let i: number;

  if (nth < 0) {
    i = s1.length;

    for (let n = 0; n > nth; n--) {
      i = s1.lastIndexOf(s2, i - 1);

      if (i === -1) {
        return -1;
      }
    }
  } else {
    i = -1;

    for (let n = -1; n < nth; n++) {
      i = s1.indexOf(s2, i + 1);

      if (i === -1) {
        return -1;
      }
    }
  }

  return i;
}

export function splitNth(
  str: Stringifiable,
  separator: Stringifiable,
  nth: number
): [string, string] {
  const s1 = toString(str);
  const s2 = toString(separator);
  const i = nthIndexOf(s1, s2, nth);

  if (i === -1) {
    return [s1, ""];
  }

  return [s1.slice(0, i), s1.slice(i + s2.length)];
}

export function remove(
  str: Stringifiable,
  substring: Stringifiable | RegExp
): string {
  return substring instanceof RegExp
    ? toString(str).replace(substring, "")
    : toString(str).replaceAll(toString(substring), "");
}

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

export function or(...args: Stringifiable[]): string {
  for (let arg of args) if ((arg = toString(arg))) return arg as string;
  return "";
}
