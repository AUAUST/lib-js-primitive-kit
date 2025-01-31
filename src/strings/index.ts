import { createProxy, Proxied } from "~/proxy";
import {
  afterFirst,
  afterLast,
  afterStart,
  beforeEnd,
  beforeFirst,
  beforeLast,
  between,
  capitalize,
  concat,
  contains,
  decrement,
  endsWith,
  increment,
  isStrictString,
  isString,
  mapReplace,
  padEnd,
  padStart,
  randomString,
  remove,
  repeat,
  split,
  splitFirst,
  splitLast,
  splitNth,
  splitWords,
  startsWith,
  stringEquals,
  toCamelCase,
  toCustomCase,
  toKebabCase,
  toLocaleLowerCase,
  toLocaleUpperCase,
  toLowerCase,
  toPascalCase,
  toSnakeCase,
  toString,
  toTitleCase,
  toUpperCase,
  trim,
  trimEnd,
  trimStart,
  truncateEnd,
  truncateStart,
  unaccent,
} from "~/strings/methods";
import type { Stringifiable, ToString } from "~/strings/types";

/** The S class, for String, provides useful methods for working with strings. */
class S {
  /**
   * Converts any value to a primitive string.
   * `null` and `undefined` are converted to empty strings.
   * Non-string values are converted using `String()`.
   */
  static from = toString;

  /** A simple is-string check. Shortcut for `typeof x === "string"`. */
  static is = isString;

  /**
   * A strict is-string check.
   * Returns true only for primitive strings, which length is greater than 0.
   */
  static isStrict = isStrictString;

  /**
   * Compares two strings.
   * Returns a boolean whether the two strings are equal.
   * The last argument provides options for the comparison.
   * Case-insensitive by default.
   */
  static equals = stringEquals;

  /**
   * Capitalizes the first letter of a string, letting the rest as-is.
   * I.e. "hello world" becomes "Hello world", "HTML" stays "HTML", "hTML" becomes "HTML".
   */
  static capitalize = capitalize;

  /** Converts all the alphabetic characters in a string to lowercase. */
  static toLowerCase = toLowerCase;
  /** Alias for `toLowerCase()`. */
  static lower = toLowerCase;

  /** Converts all the alphabetic characters in a string to uppercase. */
  static toUpperCase = toUpperCase;
  /** Alias for `toUpperCase()`. */
  static upper = toUpperCase;

  /** Returns a string where all alphabetic characters have been converted to lowercase, taking into account the host environment's current locale. */
  static toLocaleLowerCase = toLocaleLowerCase;

  /** Returns a string where all alphabetic characters have been converted to uppercase, taking into account the host environment's current locale. */
  static toLocaleUpperCase = toLocaleUpperCase;

  /**
   * Concatenates multiple strings, with an optional separator.
   * The separator is an empty string by default. To pass a separator, pass an object with a `separator` property as the last argument.
   */
  static concat = concat;

  /** Repeats a string the specified number of times. */
  static repeat = repeat;

  /**
   * Splits a string into an array of words.
   * Considers all non-alphanumeric characters as well as capital letters as word boundaries.
   * All non-alphanumeric characters are excluded from the result.
   *
   * @param ignoreCaps Whether to ignore capital letters as word boundaries.
   * Is useful if the input is uppercase; defeats the purpose if the input is in a case that uses capital letters as word boundaries.
   */
  static splitWords = splitWords;

  /**
   * Converts a string to Title Case.
   * It only splits the string by spaces.
   *
   * Since Title Case aims to be displayed
   */
  static toTitleCase = toTitleCase;
  /** Alias for `toTitleCase()`. */
  static title = toTitleCase;

  /**
   * Converts a string to camelCase.
   * Use `toPascalCase()` to convert to PascalCase (or UpperCamelCase).
   */
  static toCamelCase = toCamelCase;
  /** Alias for `toCamelCase()`. */
  static camel = toCamelCase;

  /**
   * Converts a string to PascalCase, also known as UpperCamelCase.
   * Use `toCamelCase()` to convert to camelCase.
   */
  static toPascalCase = toPascalCase;
  /** Alias for `toPascalCase()`. */
  static pascal = toPascalCase;

  /** Converts a string to kebab-case. */
  static toKebabCase = toKebabCase;
  /** Alias for `toKebabCase()`. */
  static kebab = toKebabCase;

  /** Converts a string to snake_case. */
  static toSnakeCase = toSnakeCase;
  /** Alias for `toSnakeCase()`. */
  static snake = toSnakeCase;

  /** Converts a string to a configurable case. */
  static toCustomCase = toCustomCase;
  /** Alias for `toCustomCase()`. */
  static custom = toCustomCase;

  /**
   * Removes accents from a string. Useful for i.e. URL slugs.
   * `ﬁ` becomes `fi`, `à` becomes `a`, etc.
   *
   * Some characters are also typographically inaccurately replaced, such as `œ` and `æ` becoming `oe` and `ae` respectively.
   * Despite technically being entirely different letters, it's most of the time the expected behavior when unaccenting a string.
   */
  static unaccent = unaccent;

  /**
   * Trims a string on both ends, removing the specified characters or pattern, or spaces by default.
   * Warning: providing a string of multiple characters will remove all occurrences of each character, not the whole string.
   */
  static trim = trim;

  /**
   * Trims a string on the left, removing the specified characters or pattern, or spaces by default.
   * Warning: providing a string of multiple characters will remove all occurrences of each character, not the whole string.
   */
  static trimStart = trimStart;

  /**
   * Trims a string on the right, removing the specified characters or pattern, or spaces by default.
   * Warning: providing a string of multiple characters will remove all occurrences of each character, not the whole string.
   */
  static trimEnd = trimEnd;

  /**
   * Pads the left side of a string with the specified characters,
   * or spaces by default, until the string reaches the specified length.
   */
  static padStart = padStart;

  /**
   * Pads the right side of a string with the specified characters,
   * or spaces by default, until the string reaches the specified length.
   */
  static padEnd = padEnd;

  /**
   * Truncates the left side of a string to the specified length.
   * If the string is longer than the specified length and an ellipsis string is provided,
   * the overhanging characters are replaced by the ellipsis.
   */
  static truncateStart = truncateStart;

  /**
   * Truncates the right side of a string to the specified length.
   * If the string is longer than the specified length and an ellipsis string is provided,
   * the overhanging characters are replaced by the ellipsis.
   */
  static truncateEnd = truncateEnd;

  /**
   * Returns the substring after the first occurrence of a specified substring.
   * If the substring is not found, returns an empty string.
   */
  static afterFirst = afterFirst;

  /**
   * Returns the substring after the last occurrence of a specified substring.
   * If the substring is not found, returns an empty string.
   */
  static afterLast = afterLast;

  /**
   * Returns the substring after the first occurrence of a specified substring, only if the substring is at the beginning of the string.
   * If the substring isn't found at the beginning of the string, returns an empty string.
   */
  static afterStart = afterStart;

  /**
   * Returns the substring before the first occurrence of a specified substring.
   * If the substring is not found, returns an empty string.
   */
  static beforeFirst = beforeFirst;

  /**
   * Returns the substring before the last occurrence of a specified substring.
   * If the substring is not found, returns an empty string.
   */
  static beforeLast = beforeLast;

  /**
   * Returns the substring before the first occurrence of a specified substring, only if the substring is at the end of the string.
   * If the substring isn't found at the end of the string, returns an empty string.
   */
  static beforeEnd = beforeEnd;

  /**
   * Returns the substring between the first occurrence of a specified substring and the last occurrence of another specified substring.
   * If either of the substrings is not found, returns an empty string.
   */
  static between = between;

  /**
   * Returns a boolean whether the string contains the specified substring.
   * The last argument provides options for the comparison.
   */
  static contains = contains;

  /**
   * Returns a boolean whether the string starts with the specified substring.
   * The last argument provides options for the comparison.
   */
  static startsWith = startsWith;

  /**
   * Returns a boolean whether the string ends with the specified substring.
   * The last argument provides options for the comparison.
   */
  static endsWith = endsWith;

  /** Increments the number suffix of a string, or adds a new one. */
  static increment = increment;

  /** Decrements the number suffix of a string. */
  static decrement = decrement;

  /**
   * Generates a random string of the specified length.
   * The first argument can either be a number, in which case it will be used as the length of the string, or an object with options.
   * If a number is passed as the charset, it will be used as the radix to stringify random numbers.
   *
   * IMPORTANT: This method is not cryptographically secure.
   */
  static random = randomString;

  /**
   * Takes a map of strings and replaces all occurrences of the keys with their values.
   * You may pass a 2-dimentional array with regexes as first values for more complex replacements.
   *
   * The third argument, `replaceAll`, is only used when the first argument is a string.
   * Use the global flag on the regexes if you want to replace all occurrences of a regex.
   */
  static mapReplace = mapReplace;

  /**
   * Split a string into substrings using the specified separator and return them as an array.
   * The separator can be a string or a regex, or be omitted to split by characters.
   * The third argument, `limit`, is the maximum number of splits to do.
   * @example ```ts
   * S.split("a.b.c.d.e", "."); // ["a", "b", "c", "d", "e"]
   * S.split("a.b.c.d.e", "-"); // ["a.b.c.d.e"]
   * S.split("a.b.c.d.e") // ["a.b.c.d.e"]
   * S.split("a.b.c.d.e", ".", 2); // ["a", "b.c.d.e"]
   * ```
   */
  static split = split;

  /**
   * Splits the string into two parts at the first occurrence of the specified substring.
   * If the substring is not found, returns the full string as the first part and an empty string as the second part.
   * @example ```ts
   * S.splitFirst("a.b.c.d.e", "."); // ["a", "b.c.d.e"]
   * S.splitFirst("a.b.c.d.e", "-"); // ["a.b.c.d.e", ""]
   * ```
   */
  static splitFirst = splitFirst;

  /**
   * Splits the string into two parts at the last occurrence of the specified substring.
   * If the substring is not found, returns the full string as the first part and an empty string as the second part.
   * @example ```ts
   * S.splitLast("a.b.c.d.e", "."); // ["a.b.c.d", "e"]
   * S.splitLast("a.b.c.d.e", "-"); // ["a.b.c.d.e", ""]
   */
  static splitLast = splitLast;

  /**
   * Split the string into two parts at the nth occurrence of the specified substring. The position is 0-based.
   * Negative numbers search from the end of the string.
   * If the substring is not found, returns the full string as the first part and an empty string as the second part regardless of the search direction.
   * @example ```ts
   * S.splitNth("a.b.c.d.e", ".", 1); // ["a.b", "c.d.e"]
   * S.splitNth("a.b.c.d.e", ".", -1); // ["a.b.c.d", "e"]
   * S.splitNth("a.b.c.d.e", ".", 10); // ["a.b.c.d.e", ""]
   * S.splitNth("a.b.c.d.e", ".", -10); // ["a.b.c.d.e", ""]
   * S.splitNth("a.b.c.d.e", "-", 2); // ["a.b.c.d.e", ""]
   * ```
   */
  static splitNth = splitNth;

  /** Removes all occurrences of the specified substring from the string. */
  static remove = remove;
}

const WrappedS = new Proxy(
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

function s(): Proxied<undefined, typeof S>;
function s<T extends Stringifiable | null | undefined>(
  value: T
): Proxied<T, typeof S>;
function s(value?: unknown): unknown {
  return createProxy(value, S);
}

export { WrappedS as S, s };
export type { Stringifiable, ToString };
