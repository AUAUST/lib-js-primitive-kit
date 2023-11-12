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
class S extends String {
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
    let sane1 = S.from(str1);
    let sane2 = S.from(str2);

    if (options?.caseSensitive) {
      return sane1 === sane2;
    }

    return sane1.toLowerCase() === sane2.toLowerCase();
  }

  /**
   * Capitalizes the first letter of a string.
   */
  static capitalize(str: TLooseStringInput): string {
    let sane = S.from(str);
    return sane.charAt(0).toUpperCase() + sane.slice(1);
  }

  /**
   * Converts all the alphabetic characters in a string to lowercase.
   */
  static toLowerCase(str: TLooseStringInput): string {
    return S.from(str).toLowerCase();
  }

  /**
   * Converts all the alphabetic characters in a string to uppercase.
   */
  static toUpperCase(str: TLooseStringInput): string {
    return S.from(str).toUpperCase();
  }

  /**
   * Returns a string where all alphabetic characters have been converted to uppercase, taking into account the host environment's current locale.
   */
  static toLocaleUpperCase(
    str: TLooseStringInput,
    locales?: string | string[] | undefined
  ): string {
    return S.from(str).toLocaleUpperCase(locales);
  }

  /**
   * Returns a string where all alphabetic characters have been converted to lowercase, taking into account the host environment's current locale.
   */
  static toLocaleLowerCase(
    str: TLooseStringInput,
    locales?: string | string[] | undefined
  ): string {
    return S.from(str).toLocaleLowerCase(locales);
  }

  /**
   * Splits a string into an array of words.
   * Considers all non-alphanumeric characters as well as capital letters as word boundaries.
   * All non-alphanumeric characters are excluded from the result.
   */
  static splitWords(str: TLooseStringInput): string[] {
    return S.from(str)
      .split(/[^a-zA-Z0-9]+|(?=[A-Z])/g)
      .filter(Boolean);
  }

  /**
   * Converts a string to Title Case.
   * It only splits the string by spaces.
   *
   * Since Title Case aims to be displayed
   */
  static toTitleCase(str: TLooseStringInput): string {
    return S.from(str)
      .split(/\s+/)
      .map(S.capitalize)
      .join(" ")
      .split("-")
      .map(S.capitalize)
      .join("-");
  }

  /**
   * Trims a string on both ends, removing the specified characters or pattern, or spaces by default.
   * Warning: providing a string of multiple characters will remove all occurrences of each character, not the whole string.
   */
  static trim(str: TLooseStringInput, chars?: string | RegExp): string {
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
  static trimStart(str: TLooseStringInput, chars?: string | RegExp): string {
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
  static trimEnd(str: TLooseStringInput, chars?: string | RegExp): string {
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
    str: TLooseStringInput,
    length: number,
    filler?: TLooseStringInput
  ): string {
    return S.from(str).padStart(length, S.from(filler) || " ");
  }

  /**
   * Pads the right side of a string with the specified characters, or spaces by default, until the string reaches the specified length.
   */
  static padEnd(
    str: TLooseStringInput,
    length: number,
    filler?: TLooseStringInput
  ): string {
    return S.from(str).padEnd(length, S.from(filler) || " ");
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
    str: TLooseStringInput,
    length: number,
    ellipsis?: TLooseStringInput
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
}

export { S };
