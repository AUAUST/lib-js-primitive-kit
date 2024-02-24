import type {
  Capitalized,
  Concatenated,
  Lowercased,
  Stringifiable,
  ToString,
  Uppercased,
} from "~/types/String";

/**
 * Used by case-modifying methods to determine how to handle casing.
 * If used as a boolean, it will be used as the `ignoreCaps` option.
 *
 * `ignoreCaps` is always `false` by default.
 * `unaccent` is always `true` by default.
 */
type CasingOptions =
  | boolean
  | {
      ignoreCaps?: boolean;
      unaccent?: boolean;
    };

/**
 * The S class, for String, provides useful methods for working with strings.
 */
class S extends String {
  /** @internal */
  private static casingOptions(options?: CasingOptions) {
    return typeof options === "boolean"
      ? {
          ignoreCaps: options,
          unaccent: true,
        }
      : {
          ignoreCaps: options?.ignoreCaps ?? false,
          unaccent: options?.unaccent ?? true,
        };
  }

  /**
   * Converts any value to a string.
   * `null` and `undefined` are converted to empty strings.
   * Non-string values are converted using `String()`.
   */
  static from<T extends Stringifiable>(str: T): ToString<T> {
    if (str === null || str === undefined) {
      return "" as ToString<T>;
    }

    return String(str) as ToString<T>;
  }

  /**
   * A simple is-string check. Shortcut for `typeof x === "string"`.
   */
  static is(x: any): x is string {
    return typeof x === "string";
  }

  /**
   * A strict is-string check.
   * Returns true only for primitive strings, which length is greater than 0.
   */
  static isStrict(x: any): x is string {
    return typeof x === "string" && x !== "";
  }

  /**
   * Compares two strings.
   * Returns a boolean whether the two strings are equal.
   * The last argument provides options for the comparison.
   * Case-insensitive by default.
   */
  static equals(
    str1: Stringifiable,
    str2: Stringifiable,
    options?: {
      caseSensitive?: boolean;
    }
  ): boolean {
    let sane1 = S.from(str1);
    let sane2 = S.from(str2);

    if (options?.caseSensitive) {
      return sane1 === sane2;
    }

    return sane1.toLowerCase() === sane2.toLowerCase();
  }

  /**
   * Capitalizes the first letter of a string, letting the rest as-is.
   * I.e. "hello world" becomes "Hello world", "HTML" stays "HTML", "hTML" becomes "HTML".
   */
  static capitalize<T extends Stringifiable>(str: T): Capitalized<T> {
    let sane = S.from(str);
    return (sane.charAt(0).toUpperCase() + sane.slice(1)) as Capitalized<T>;
  }

  /**
   * Converts all the alphabetic characters in a string to lowercase.
   */
  static toLowerCase<T extends Stringifiable>(str: T): Lowercased<T> {
    return S.from(str).toLowerCase() as Lowercased<T>;
  }

  /**
   * Converts all the alphabetic characters in a string to uppercase.
   */
  static toUpperCase<T extends Stringifiable>(str: T): Uppercased<T> {
    return S.from(str).toUpperCase() as Uppercased<T>;
  }

  /**
   * Returns a string where all alphabetic characters have been converted to uppercase, taking into account the host environment's current locale.
   */
  static toLocaleUpperCase(
    str: Stringifiable,
    locales?: string | string[] | undefined
  ): string {
    return S.from(str).toLocaleUpperCase(locales);
  }

  /**
   * Returns a string where all alphabetic characters have been converted to lowercase, taking into account the host environment's current locale.
   */
  static toLocaleLowerCase(
    str: Stringifiable,
    locales?: string | string[] | undefined
  ): string {
    return S.from(str).toLocaleLowerCase(locales);
  }

  /**
   * Concatenates multiple strings, with an optional separator.
   * The separator is an empty string by default. To pass a separator, pass an object with a `separator` property as the last argument.
   */
  static concat<
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

    return strings.map(S.from).filter(Boolean).join(S.from(separator)) as any;
  }

  /**
   * Splits a string into an array of words.
   * Considers all non-alphanumeric characters as well as capital letters as word boundaries.
   * All non-alphanumeric characters are excluded from the result.
   *
   * @param ignoreCaps Whether to ignore capital letters as word boundaries.
   * Is useful if the input is uppercase; defeats the purpose if the input is in a case that uses capital letters as word boundaries.
   */
  static splitWords(str: Stringifiable, options?: CasingOptions): string[] {
    const { ignoreCaps, unaccent } = S.casingOptions(options);

    const string = unaccent ? S.unaccent(str) : S.from(str);

    const regex = ignoreCaps
      ? /[^\p{L}\d]+/gu // will match all non-alphanumeric characters
      : /[^\p{L}\d]+|(?=[\p{Lu}])/gu; // will match all non-alphanumeric characters AND positions before a capital letter

    return string.split(regex).filter(Boolean);
  }

  /**
   * Converts a string to Title Case.
   * It only splits the string by spaces.
   *
   * Since Title Case aims to be displayed
   */
  static toTitleCase(str: Stringifiable): string {
    return S.from(str)
      .split(/\s+/)
      .map(S.capitalize)
      .join(" ")
      .split("-")
      .map(S.capitalize)
      .join("-");
  }

  /**
   * Converts a string to camelCase.
   * Use `toUpperCamelCase()` to convert to UpperCamelCase (or PascalCase).
   */
  static toCamelCase(str: Stringifiable, options?: CasingOptions): string {
    return S.splitWords(S.unaccent(str), options)
      .map((word, index) => {
        if (index === 0) {
          return word.toLowerCase();
        }

        return S.capitalize(word.toLowerCase());
      })
      .join("");
  }

  /**
   * Converts a string to UpperCamelCase, also known as PascalCase.
   * Use `toCamelCase()` to convert to camelCase.
   */
  static toUpperCamelCase(str: Stringifiable, options?: CasingOptions): string {
    return S.splitWords(S.unaccent(str), options)
      .map((word) => S.capitalize(word.toLowerCase()))
      .join("");
  }

  /**
   * Converts a string to kebab-case.
   */
  static toKebabCase(str: Stringifiable, options?: CasingOptions): string {
    return S.splitWords(S.unaccent(str), options).join("-").toLowerCase();
  }

  /**
   * Converts a string to snake_case.
   */
  static toSnakeCase(str: Stringifiable, options?: CasingOptions): string {
    return S.splitWords(S.unaccent(str), options).join("_").toLowerCase();
  }

  /**
   * Converts a string to a configurable case.
   */
  static toCustomCase(
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
    const { separator, wordCase, firstWordCase, ignoreCaps, unaccent } = S.is(
      options
    )
      ? {
          separator: S.from(options),
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
          return S.capitalize(word);
        case "keep":
          return word;
      }

      // If none matched, it's either:
      // - the first index and firstWordCase is "match", so we return the word as it would be handled as a non-first word
      // - a wrong input, so we return the word as it is
      return index === 0 ? toCase(word, -1) : word;
    };

    if (unaccent) str = S.unaccent(str);

    return S.splitWords(str, ignoreCaps).map(toCase).join(separator);
  }

  /**
   * Removes accents from a string. Useful for i.e. URL slugs.
   * `ﬁ` becomes `fi`, `à` becomes `a`, etc.
   *
   * Some characters are also typographically inaccurately replaced, such as `œ` and `æ` becoming `oe` and `ae` respectively.
   * Despite technically being entirely different letters, it's most of the time the expected behavior when unaccenting a string.
   */
  static unaccent(str: Stringifiable): string {
    return (
      S.mapReplace(str, [
        // "ﬁ" and similar ligatures are replaced by the NFKD normalization
        // The only manual replacements are the ones above as they are the "wrong" replacements
        ["Œ", "Oe"],
        ["œ", "oe"],
        ["Æ", "Ae"],
        ["æ", "ae"],
        ["ß", "ss"],
      ])
        .normalize("NFKD")
        // combining diacritical marks Unicode range
        .replace(/[\u0300-\u036f]/g, "")
    );
  }

  /**
   * Trims a string on both ends, removing the specified characters or pattern, or spaces by default.
   * Warning: providing a string of multiple characters will remove all occurrences of each character, not the whole string.
   */
  static trim(str: Stringifiable, chars?: string | RegExp): string {
    if (!chars) {
      return S.from(str).trim();
    }

    if (S.is(chars)) {
      return S.from(str).replace(
        new RegExp(`^[${chars}]+|[${chars}]+$`, "g"),
        ""
      );
    }

    if (chars instanceof RegExp) {
      return S.from(str).replace(
        new RegExp(`^(${chars.source})+|(${chars.source})+$`, "g"),
        ""
      );
    }

    throw new TypeError(
      "S.trim() only accepts strings or RegExp as second argument."
    );
  }

  /**
   * Trims a string on the left, removing the specified characters or pattern, or spaces by default.
   * Warning: providing a string of multiple characters will remove all occurrences of each character, not the whole string.
   */
  static trimStart(str: Stringifiable, chars?: string | RegExp): string {
    if (!chars) {
      return S.from(str).trimStart();
    }

    if (S.is(chars)) {
      return S.from(str).replace(new RegExp(`^[${chars}]+`, "g"), "");
    }

    if (chars instanceof RegExp) {
      return S.from(str).replace(new RegExp(`^(${chars.source})+`, "g"), "");
    }

    throw new TypeError(
      "S.trimStart() only accepts strings or RegExp as second argument."
    );
  }

  /**
   * Trims a string on the right, removing the specified characters or pattern, or spaces by default.
   * Warning: providing a string of multiple characters will remove all occurrences of each character, not the whole string.
   */
  static trimEnd(str: Stringifiable, chars?: string | RegExp): string {
    if (!chars) {
      return S.from(str).trimEnd();
    }

    if (S.is(chars)) {
      return S.from(str).replace(new RegExp(`[${chars}]+$`, "g"), "");
    }

    if (chars instanceof RegExp) {
      return S.from(str).replace(new RegExp(`(${chars.source})+$`, "g"), "");
    }

    throw new TypeError(
      "S.trimEnd() only accepts strings or RegExp as second argument."
    );
  }

  /**
   * Pads the left side of a string with the specified characters, or spaces by default, until the string reaches the specified length.
   */
  static padStart(
    str: Stringifiable,
    length: number,
    filler?: Stringifiable
  ): string {
    return S.from(str).padStart(length, S.from(filler) || " ");
  }

  /**
   * Pads the right side of a string with the specified characters, or spaces by default, until the string reaches the specified length.
   */
  static padEnd(
    str: Stringifiable,
    length: number,
    filler?: Stringifiable
  ): string {
    return S.from(str).padEnd(length, S.from(filler) || " ");
  }

  /**
   * Truncates the left side of a string to the specified length.
   * If the string is longer than the specified length and an ellipsis string is provided, the overhanging characters are replaced by the ellipsis.
   */
  static truncateStart(
    str: Stringifiable,
    length: number,
    ellipsis?: Stringifiable
  ): string {
    let sane = S.from(str);
    let saneEllipsis = S.from(ellipsis);

    if (sane.length <= length) {
      return sane;
    }

    if (saneEllipsis.length >= length) {
      throw new RangeError(
        "S.truncateStart() requires the length of the ellipsis to be shorter than the maximum length of the string."
      );
    }

    return (
      saneEllipsis + sane.slice(sane.length - length + saneEllipsis.length)
    );
  }

  /**
   * Truncates the right side of a string to the specified length.
   * If the string is longer than the specified length and an ellipsis string is provided, the overhanging characters are replaced by the ellipsis.
   */
  static truncateEnd(
    str: Stringifiable,
    length: number,
    ellipsis?: Stringifiable
  ): string {
    let sane = S.from(str);
    let saneEllipsis = S.from(ellipsis);

    if (sane.length <= length) {
      return sane;
    }

    if (saneEllipsis.length >= length) {
      throw new RangeError(
        "S.truncateEnd() requires the length of the ellipsis to be shorter than the maximum length of the string."
      );
    }

    return sane.slice(0, length - saneEllipsis.length) + saneEllipsis;
  }

  /**
   * Returns the substring after the first occurrence of a specified substring.
   * If the substring is not found, returns an empty string.
   */
  static afterFirst<T extends Stringifiable, U extends Stringifiable>(
    str: T,
    substring: U
  ): string {
    const sane = S.from(str);
    const saneSubstring = S.from(substring);

    const index = sane.indexOf(saneSubstring);

    if (index === -1) {
      return "" as any;
    }

    return sane.slice(index + saneSubstring.length) as any;
  }

  /**
   * Returns the substring after the last occurrence of a specified substring.
   * If the substring is not found, returns an empty string.
   */
  static afterLast(str: Stringifiable, substring: Stringifiable): string {
    const sane = S.from(str);
    const saneSubstring = S.from(substring);

    const index = sane.lastIndexOf(saneSubstring);

    if (index === -1) {
      return "";
    }

    return sane.slice(index + saneSubstring.length);
  }

  /**
   * Returns the substring after the first occurrence of a specified substring, only if the substring is at the beginning of the string.
   * If the substring isn't found at the beginning of the string, returns an empty string.
   */
  static afterStart(str: Stringifiable, substring: Stringifiable): string {
    const sane = S.from(str);
    const saneSubstring = S.from(substring);

    if (!sane.startsWith(saneSubstring)) {
      return "";
    }

    return sane.slice(saneSubstring.length);
  }

  /**
   * Returns the substring before the first occurrence of a specified substring.
   * If the substring is not found, returns an empty string.
   */
  static beforeFirst(str: Stringifiable, substring: Stringifiable): string {
    const sane = S.from(str);
    const saneSubstring = S.from(substring);

    const index = sane.indexOf(saneSubstring);

    if (index === -1) {
      return "";
    }

    return sane.slice(0, index);
  }

  /**
   * Returns the substring before the last occurrence of a specified substring.
   * If the substring is not found, returns an empty string.
   */
  static beforeLast(str: Stringifiable, substring: Stringifiable): string {
    const sane = S.from(str);
    const saneSubstring = S.from(substring);

    const index = sane.lastIndexOf(saneSubstring);

    if (index === -1) {
      return "";
    }

    return sane.slice(0, index);
  }

  /**
   * Returns the substring before the first occurrence of a specified substring, only if the substring is at the end of the string.
   * If the substring isn't found at the end of the string, returns an empty string.
   */
  static beforeEnd(str: Stringifiable, substring: Stringifiable): string {
    const sane = S.from(str);
    const saneSubstring = S.from(substring);

    if (!sane.endsWith(saneSubstring)) {
      return "";
    }

    return sane.slice(0, sane.length - saneSubstring.length);
  }

  /**
   * Returns the substring between the first occurrence of a specified substring and the last occurrence of another specified substring.
   * If either of the substrings is not found, returns an empty string.
   */
  static between(
    str: Stringifiable,
    startSubstring: Stringifiable,
    endSubstring: Stringifiable
  ): string {
    const sane = S.from(str);
    const saneStartSubstring = S.from(startSubstring);
    const saneEndSubstring = S.from(endSubstring);

    const startIndex = sane.indexOf(saneStartSubstring);
    const endIndex = sane.lastIndexOf(saneEndSubstring);

    if (startIndex === -1 || endIndex === -1) {
      return "";
    }

    return sane.slice(startIndex + saneStartSubstring.length, endIndex);
  }

  /**
   * Returns a boolean whether the string contains the specified substring.
   * The last argument provides options for the comparison.
   */
  static contains<Sub extends Stringifiable>(
    str: Stringifiable,
    substring: Sub,
    options?: {
      caseSensitive?: boolean;
    }
  ): str is `${string}${ToString<Sub>}${string}` {
    const sane = S.from(str);
    const saneSubstring = S.from(substring);
    const { caseSensitive = true } = options ?? {};

    if (caseSensitive) {
      return sane.includes(saneSubstring);
    }

    return sane.toLowerCase().includes(saneSubstring.toLowerCase());
  }

  /**
   * Returns a boolean whether the string starts with the specified substring.
   * The last argument provides options for the comparison.
   */
  static startsWith<Sub extends Stringifiable>(
    str: Stringifiable,
    substring: Sub,
    options?: {
      caseSensitive?: boolean;
      trim?: boolean;
    }
  ): str is `${ToString<Sub>}${string}` {
    const { caseSensitive = true, trim = false } = options ?? {};
    const sane = trim ? S.trimStart(str) : S.from(str);
    const saneSubstring = S.from(substring);

    if (caseSensitive) {
      return sane.startsWith(saneSubstring);
    }

    return sane.toLowerCase().startsWith(saneSubstring.toLowerCase());
  }

  /**
   * Returns a boolean whether the string ends with the specified substring.
   * The last argument provides options for the comparison.
   */
  static endsWith<Sub extends Stringifiable>(
    str: Stringifiable,
    substring: Sub,
    options?: {
      caseSensitive?: boolean;
      trim?: boolean;
    }
  ): str is `${string}${ToString<Sub>}` {
    const { caseSensitive = true, trim = false } = options ?? {};
    const sane = trim ? S.trimEnd(str) : S.from(str);
    const saneSubstring = S.from(substring);

    if (caseSensitive) {
      return sane.endsWith(saneSubstring);
    }

    return sane.toLowerCase().endsWith(saneSubstring.toLowerCase());
  }

  /**
   * Increments the number suffix of a string, or adds a new one.
   */
  static increment(
    str: Stringifiable,
    options?:
      | {
          increment?: number;
          separator?: string;
          pad?: number;
          filler?: string;
        }
      | number
  ): string {
    const {
      increment = 1,
      separator = "",
      pad = 0,
      filler = "0",
    } = typeof options === "number" ? { increment: options } : options ?? {};

    const sane = S.from(str);

    if (increment === 0) return sane;

    const current = sane.match(/\d+$/)?.[0] ?? "";

    if (current === "") {
      return sane + separator + S.padStart(increment, pad, filler);
    }

    const next = parseInt(current) + increment;

    return sane.replace(/\d+$/, "") + S.padStart(next, pad, filler);
  }

  /**
   * Decrements the number suffix of a string.
   */
  static decrement(
    str: Stringifiable,
    options?:
      | {
          /**
           * If false, a decrement resulting in a negative number will throw an error.
           * False by default.
           */
          ignoreNegative?: boolean;
          /**
           * If false and the decrement results in zero, the suffix will be removed.
           * If true, uses 0 as the suffix.
           */
          keepZero?: boolean;
          decrement?: number;
          separator?: string;
          pad?: number | false;
          filler?: string;
        }
      | number
  ): string {
    const {
      ignoreNegative = false,
      keepZero = false,
      decrement = 1,
      separator = "",
      pad = false,
      filler = "0",
    } = typeof options === "number" ? { decrement: options } : options ?? {};

    const rawSane = S.from(str);

    if (decrement === 0) return rawSane;

    const current = rawSane.match(/\d+$/)?.[0] ?? "0";
    const sane = S.beforeEnd(rawSane, current) || rawSane;

    if ((Number(current) || 0) - decrement < 0) {
      if (ignoreNegative) {
        if (keepZero)
          return sane + separator + (pad ? S.padStart(0, pad, filler) : 0);

        // Trim the separator and the zero suffix.
        return separator
          ? S.trimEnd(sane, separator)
          : sane.replace(/\d+$/, "");
      }

      throw new Error(
        `S.decrement() requires the string to have a number suffix, which '${sane}' hasn't.`
      );
    }

    const next = parseInt(current) - decrement;

    // if (next < 0) {
    //   if (ignoreNegative) {
    //     return sane;
    //   }

    //   throw new RangeError(
    //     `S.decrement(): '${sane}' cannot be decremented by '${decrement}' because it would result in a negative number.`
    //   );
    // }

    const trimmed = separator
      ? S.trimEnd(sane, separator)
      : sane.replace(/\d+$/, "");

    if (next === 0 && !keepZero) {
      return trimmed;
    }

    return trimmed + separator + (pad ? S.padStart(next, pad, filler) : next);
  }

  static __randomPools = {
    lower: "abcdefghijklmnopqrstuvwxyz",
    upper: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
    numbers: "0123456789",
    symbols: "-_",
  } as const;

  /**
   * Generates a random string of the specified length.
   * The argument can either be a number, in which case it will be used as the length of the string, or an object with options.
   *
   * IMPORTANT: This method is not cryptographically secure.
   */
  static random(
    options:
      | number
      | {
          length?: number;
          /**
           * A string containing the complete list of allowed characters.
           * If specified, all other options are ignored except `length`.
           */
          chars: string;
        }
      | {
          length?: number;
          /**
           * The case of the letters.
           */
          case?: "lower" | "upper" | "mixed";
          /**
           * Whether to include numbers, or a string of numbers to use.
           */
          numbers?: boolean | string;
          /**
           * Whether to include symbols, or a string of symbols to use.
           * If `true`, uses `-` and `_`.
           */
          symbols?: boolean | string;
        } = 16,
    chars?: string
  ): string {
    let { length, pool } = (() => {
      const length =
        typeof options === "number" ? options : options.length || 16;

      if (typeof options === "number") {
        if (typeof chars === "string") {
          return {
            length,
            pool: chars,
          };
        }

        return {
          length,
          pool:
            S.__randomPools.lower +
            S.__randomPools.upper +
            S.__randomPools.numbers,
        };
      }

      if ("chars" in options) {
        return {
          length,
          pool: options.chars,
        };
      }

      const { case: letterCase, numbers, symbols } = options;

      let pool = "";

      if (letterCase === "lower" || letterCase === "mixed") {
        pool += S.__randomPools.lower;
      }
      if (letterCase === "upper" || letterCase === "mixed") {
        pool += S.__randomPools.upper;
      }
      if (numbers) {
        pool += typeof numbers === "string" ? numbers : S.__randomPools.numbers;
      }
      if (symbols) {
        pool += typeof symbols === "string" ? symbols : S.__randomPools.symbols;
      }

      return {
        length,
        pool,
      };
    })();

    if (length === 0) return "";
    if (!isFinite(length) || isNaN(length) || length < 0) {
      throw new RangeError(
        "S.random() requires a length greater than or equal to 0."
      );
    }

    // 1. Normalize the pool, in case combining characters are passed.
    //    This would prevent i.e. "à" from being interpreted as "a" and "`".
    // 2. Deduplicate the pool.
    pool = [...new Set(pool.normalize("NFKC"))].join("");

    if (pool.length < 1) {
      throw new RangeError(
        "S.random() requires at least one character to be allowed."
      );
    }

    if (pool.length === 1) return pool.repeat(length);

    let result = "";

    const randIndex = () => Math.floor(Math.random() * pool.length);

    for (let i = 0; i < length; i++) {
      result += pool[randIndex()];
    }

    return result;
  }

  /**
   * Takes a map of strings and replaces all occurrences of the keys with their values.
   * You may pass a 2-dimentional array with regexes as first values for more complex replacements.
   *
   * The third argument, `replaceAll`, is only used when the first argument is a string.
   * Use the global flag on the regexes if you want to replace all occurrences of a regex.
   */
  static mapReplace(
    str: Stringifiable,
    map: Record<string, string> | [string | RegExp, Stringifiable][],
    replaceAll?: boolean
  ): string {
    let sane: string = S.from(str);

    const entries = Array.isArray(map) ? map : Object.entries(map);

    for (const [key, value] of entries) {
      if (replaceAll && typeof key === "string") {
        sane = sane.replaceAll(key, S.from(value));
        continue;
      }

      sane = sane.replace(key, S.from(value));
    }

    return sane;
  }
}

const WrappedS = new Proxy(
  // The proxy makes it callable, using the `from()` method.
  S as typeof S & {
    <T extends Stringifiable>(str: T): ToString<T>;
  },
  {
    apply(target, _, argumentsList) {
      // @ts-ignore
      return target.from(...argumentsList);
    },
  }
);

export { WrappedS as S };
export type { Stringifiable };
