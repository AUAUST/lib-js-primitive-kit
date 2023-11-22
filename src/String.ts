type TStringifiable = string | String | number | boolean | null | undefined;
type TLooseStringInput =
  | TStringifiable
  | {
      toString(): TStringifiable;
    }
  | {
      [Symbol.toPrimitive](): TStringifiable;
    };

/**
 * The S class, for String, provides useful methods for working with strings.
 */
class RawS extends String {
  /**
   * Converts any value to a string.
   * `null` and `undefined` are converted to empty strings.
   * Non-string values are converted using `String()`.
   */
  static from(str: TLooseStringInput): string {
    if (str === null || str === undefined) {
      return "";
    }

    return String(str);
  }

  /**
   * A simple is-string check.
   * Returns true both for primitive strings and String objects.
   */
  static is(x: any): x is string | String {
    return typeof x === "string" || x instanceof String;
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
    str1: TLooseStringInput,
    str2: TLooseStringInput,
    options?: {
      caseSensitive?: boolean;
    }
  ) {
    let sane1 = RawS.from(str1);
    let sane2 = RawS.from(str2);

    if (options?.caseSensitive) {
      return sane1 === sane2;
    }

    return sane1.toLowerCase() === sane2.toLowerCase();
  }

  /**
   * Capitalizes the first letter of a string.
   */
  static capitalize(str: TLooseStringInput): string {
    let sane = RawS.from(str);
    return sane.charAt(0).toUpperCase() + sane.slice(1);
  }

  /**
   * Converts all the alphabetic characters in a string to lowercase.
   */
  static toLowerCase(str: TLooseStringInput): string {
    return RawS.from(str).toLowerCase();
  }

  /**
   * Converts all the alphabetic characters in a string to uppercase.
   */
  static toUpperCase(str: TLooseStringInput): string {
    return RawS.from(str).toUpperCase();
  }

  /**
   * Returns a string where all alphabetic characters have been converted to uppercase, taking into account the host environment's current locale.
   */
  static toLocaleUpperCase(
    str: TLooseStringInput,
    locales?: string | string[] | undefined
  ): string {
    return RawS.from(str).toLocaleUpperCase(locales);
  }

  /**
   * Returns a string where all alphabetic characters have been converted to lowercase, taking into account the host environment's current locale.
   */
  static toLocaleLowerCase(
    str: TLooseStringInput,
    locales?: string | string[] | undefined
  ): string {
    return RawS.from(str).toLocaleLowerCase(locales);
  }

  /**
   * Splits a string into an array of words.
   * Considers all non-alphanumeric characters as well as capital letters as word boundaries.
   * All non-alphanumeric characters are excluded from the result.
   *
   * @param ignoreCaps Whether to ignore capital letters as word boundaries.
   * Is useful if the input is uppercase; defeats the purpose if the input is in a case that uses capital letters as word boundaries.
   */
  static splitWords(
    str: TLooseStringInput,
    ignoreCaps: boolean = false
  ): string[] {
    if (ignoreCaps) {
      return RawS.from(str)
        .split(/[\W_]+/g)
        .filter(Boolean);
    }

    return RawS.from(str)
      .split(/[\W_]+|(?=[A-Z])/g)
      .filter(Boolean);
  }

  /**
   * Converts a string to Title Case.
   * It only splits the string by spaces.
   *
   * Since Title Case aims to be displayed
   */
  static toTitleCase(str: TLooseStringInput): string {
    return RawS.from(str)
      .split(/\s+/)
      .map(RawS.capitalize)
      .join(" ")
      .split("-")
      .map(RawS.capitalize)
      .join("-");
  }

  /**
   * Converts a string to camelCase.
   * Use `toUpperCamelCase()` to convert to UpperCamelCase (or PascalCase).
   */
  static toCamelCase(str: TLooseStringInput, ignoreCaps?: boolean): string {
    return RawS.splitWords(str, ignoreCaps)
      .map((word, index) => {
        if (index === 0) {
          return word.toLowerCase();
        }

        return RawS.capitalize(word.toLowerCase());
      })
      .join("");
  }

  /**
   * Converts a string to UpperCamelCase, also known as PascalCase.
   * Use `toCamelCase()` to convert to camelCase.
   */
  static toUpperCamelCase(
    str: TLooseStringInput,
    ignoreCaps?: boolean
  ): string {
    return RawS.splitWords(str, ignoreCaps)
      .map((word) => RawS.capitalize(word.toLowerCase()))
      .join("");
  }

  /**
   * Converts a string to kebab-case.
   */
  static toKebabCase(str: TLooseStringInput, ignoreCaps?: boolean): string {
    return RawS.splitWords(str, ignoreCaps).join("-").toLowerCase();
  }

  /**
   * Converts a string to snake_case.
   */
  static toSnakeCase(str: TLooseStringInput, ignoreCaps?: boolean): string {
    return RawS.splitWords(str, ignoreCaps).join("_").toLowerCase();
  }

  /**
   * Converts a string to a configurable case.
   */
  static toCustomCase(
    str: TLooseStringInput,
    options:
      | {
          separator?: string;
          wordCase?: "lower" | "upper" | "capital" | "keep";
          firstWordCase?: "lower" | "upper" | "capital" | "keep" | "match";
          ignoreCaps?: boolean;
        }
      | string
  ): string {
    const { separator, wordCase, firstWordCase, ignoreCaps } = RawS.is(options)
      ? {
          separator: RawS.from(options),
          wordCase: "keep",
          firstWordCase: "match",
          ignoreCaps: undefined, // for TS
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
          return RawS.capitalize(word);
        case "keep":
          return word;
      }

      // If none matched, it's either:
      // - the first index and firstWordCase is "match", so we return the word as it would be handled as a non-first word
      // - a wrong input, so we return the word as it is
      return index === 0 ? toCase(word, -1) : word;
    };

    return RawS.splitWords(str, ignoreCaps).map(toCase).join(separator);
  }

  /**
   * Trims a string on both ends, removing the specified characters or pattern, or spaces by default.
   * Warning: providing a string of multiple characters will remove all occurrences of each character, not the whole string.
   */
  static trim(str: TLooseStringInput, chars?: string | RegExp): string {
    if (!chars) {
      return RawS.from(str).trim();
    }

    if (RawS.is(chars)) {
      return RawS.from(str).replace(
        new RegExp(`^[${chars}]+|[${chars}]+$`, "g"),
        ""
      );
    }

    if (chars instanceof RegExp) {
      return RawS.from(str).replace(
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
  static trimStart(str: TLooseStringInput, chars?: string | RegExp): string {
    if (!chars) {
      return RawS.from(str).trimStart();
    }

    if (RawS.is(chars)) {
      return RawS.from(str).replace(new RegExp(`^[${chars}]+`, "g"), "");
    }

    if (chars instanceof RegExp) {
      return RawS.from(str).replace(new RegExp(`^(${chars.source})+`, "g"), "");
    }

    throw new TypeError(
      "S.trimStart() only accepts strings or RegExp as second argument."
    );
  }

  /**
   * Trims a string on the right, removing the specified characters or pattern, or spaces by default.
   * Warning: providing a string of multiple characters will remove all occurrences of each character, not the whole string.
   */
  static trimEnd(str: TLooseStringInput, chars?: string | RegExp): string {
    if (!chars) {
      return RawS.from(str).trimEnd();
    }

    if (RawS.is(chars)) {
      return RawS.from(str).replace(new RegExp(`[${chars}]+$`, "g"), "");
    }

    if (chars instanceof RegExp) {
      return RawS.from(str).replace(new RegExp(`(${chars.source})+$`, "g"), "");
    }

    throw new TypeError(
      "S.trimEnd() only accepts strings or RegExp as second argument."
    );
  }

  /**
   * Pads the left side of a string with the specified characters, or spaces by default, until the string reaches the specified length.
   */
  static padStart(
    str: TLooseStringInput,
    length: number,
    filler?: TLooseStringInput
  ): string {
    return RawS.from(str).padStart(length, RawS.from(filler) || " ");
  }

  /**
   * Pads the right side of a string with the specified characters, or spaces by default, until the string reaches the specified length.
   */
  static padEnd(
    str: TLooseStringInput,
    length: number,
    filler?: TLooseStringInput
  ): string {
    return RawS.from(str).padEnd(length, RawS.from(filler) || " ");
  }

  /**
   * Truncates the left side of a string to the specified length.
   * If the string is longer than the specified length and an ellipsis string is provided, the overhanging characters are replaced by the ellipsis.
   */
  static truncateStart(
    str: TLooseStringInput,
    length: number,
    ellipsis?: TLooseStringInput
  ): string {
    let sane = RawS.from(str);
    let saneEllipsis = RawS.from(ellipsis);

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
    str: TLooseStringInput,
    length: number,
    ellipsis?: TLooseStringInput
  ): string {
    let sane = RawS.from(str);
    let saneEllipsis = RawS.from(ellipsis);

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
}

const S = new Proxy(
  // The proxy makes it callable, using the `from()` method.
  RawS as typeof RawS & {
    (input: any): boolean;
  },
  {
    apply(target, _, argumentsList) {
      // @ts-ignore
      return target.from(...argumentsList);
    },
  }
);

export { S };
export type { TStringifiable };
