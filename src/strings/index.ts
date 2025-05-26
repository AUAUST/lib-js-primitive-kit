import {
  afterFirst,
  afterLast,
  afterNth,
  afterStart,
  beforeEnd,
  beforeFirst,
  beforeLast,
  beforeNth,
  between,
  capitalize,
  capitalizeWords,
  chunk,
  concat,
  contains,
  decapitalize,
  decapitalizeWords,
  decrement,
  endsWith,
  ensureEnd,
  ensureStart,
  equals,
  increment,
  insert,
  insertEvery,
  isNotString,
  isStrictString,
  isString,
  mapReplace,
  nthIndexOf,
  or,
  padEnd,
  padStart,
  prepend,
  random,
  remove,
  repeat,
  split,
  splitFirst,
  splitLast,
  splitNth,
  splitWords,
  startsWith,
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
  wrap,
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

  /** Is-string check. Shortcut for `typeof x === "string"`. */
  static is = isString;

  /** Is-not-string check. Shortcut for `typeof x !== "string"`. */
  static isNot = isNotString;

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
  static equals = equals;

  /**
   * Capitalizes the first letter of a string, letting the rest as-is.
   * I.e. "hello world" becomes "Hello world", "HTML" stays "HTML", "hTML" becomes "HTML".
   */
  static capitalize = capitalize;

  /** Capitalizes the first letter of each word in a string. */
  static capitalizeWords = capitalizeWords;

  /**
   * Decapitalize the first letter of a string, letting the rest as-is.
   * I.e. "Hello" becomes "hello", "HTML" stays "HTML", "hTML" becomes "hTML".
   */
  static decapitalize = decapitalize;

  /** Decpitalize the first letter of each word in a string. */
  static decapitalizeWords = decapitalizeWords;

  /** Converts all the alphabetic characters in a string to lowercase. */
  static toLowerCase = toLowerCase;

  /** @see S.toLowerCase */
  static lower = toLowerCase;

  /** Converts all the alphabetic characters in a string to uppercase. */
  static toUpperCase = toUpperCase;

  /** @see S.toUpperCase */
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

  /** @see S.concat */
  static append = concat;

  /** Prepends the provided strings to the target string. */
  static prepend = prepend;

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
   */
  static toTitleCase = toTitleCase;

  /** @see S.toTitleCase */
  static title = toTitleCase;

  /**
   * Converts a string to camelCase.
   * Use `toPascalCase()` to convert to PascalCase (or UpperCamelCase).
   */
  static toCamelCase = toCamelCase;

  /** @see S.toCamelCase */
  static camel = toCamelCase;

  /**
   * Converts a string to PascalCase, also known as UpperCamelCase.
   * Use `toCamelCase()` to convert to camelCase.
   */
  static toPascalCase = toPascalCase;

  /** @see S.toPascalCase */
  static pascal = toPascalCase;

  /** Converts a string to kebab-case. */
  static toKebabCase = toKebabCase;

  /** @see S.toKebabCase */
  static kebab = toKebabCase;

  /** Converts a string to snake_case. */
  static toSnakeCase = toSnakeCase;

  /** @see S.toSnakeCase */
  static snake = toSnakeCase;

  /** Converts a string to a configurable case. */
  static toCustomCase = toCustomCase;

  /** @see S.toCustomCase */
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

  /** @see S.afterFirst */
  static after = afterFirst;

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
   * Returns the substring after the nth occurrence of a specified substring.
   * If the substring is not found or is present less times than the specified number, an empty string is returned.
   * The position is 0-based.
   * Negative numbers search from the end of the string.
   * @example ```ts
   * S.afterNth("0.1.2.3", ".", 0); // "1.2.3"
   * S.afterNth("0.1.2.3", ".", 1); // "2.3"
   * S.afterNth("0.1.2.3", ".", 4); // ""
   * S.afterNth("0.1.2.3", ".", -1); // "3"
   * S.afterNth("0.1.2.3", ".", -3); // "1.2.3"
   * S.afterNth("0.1.2.3", ".", -5); // ""
   */
  static afterNth = afterNth;

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

  /** @see S.beforeFirst */
  static before = beforeFirst;

  /**
   * Returns the substring before the first occurrence of a specified substring, only if the substring is at the end of the string.
   * If the substring isn't found at the end of the string, returns an empty string.
   */
  static beforeEnd = beforeEnd;

  /**
   * Returns the substring before the nth occurrence of a specified substring.
   * If the substring is not found or is present less times than the specified number, an empty string is returned.
   * The position is 0-based.
   * Negative numbers search from the end of the string.
   * @example ```ts
   * S.beforeNth("0.1.2.3", ".", 0); // "0"
   * S.beforeNth("0.1.2.3", ".", 1); // "0.1"
   * S.beforeNth("0.1.2.3", ".", 2); // "0.1.2"
   * S.beforeNth("0.1.2.3", ".", 3); // ""
   * S.beforeNth("0.1.2.3", ".", -1); // "0.1.2"
   * S.beforeNth("0.1.2.3", ".", -4); // ""
   * ```
   */
  static beforeNth = beforeNth;

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
   * Ensures the string starts with the provided substring.
   * If the string already starts with the substring, it is returned as-is.
   * Otherwise, the substring is prepended to the string.
   */
  static ensureStart = ensureStart;

  /**
   * Returns a boolean whether the string ends with the specified substring.
   * The last argument provides options for the comparison.
   */
  static endsWith = endsWith;

  /**
   * Ensures the string ends with the provided substring.
   * If the string already ends with the substring, it is returned as-is.
   * Otherwise, the substring is appended to the string.
   */
  static ensureEnd = ensureEnd;

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
  static random = random;

  /**
   * Takes a map of strings and replaces all occurrences of the keys with their values.
   * You may pass a 2-dimentional array with regexes as first values for more complex replacements.
   *
   * The third argument, `replaceAll`, is only used when the first argument is a string.
   * Use the global flag on the regexes if you want to replace all occurrences of a regex.
   */
  static mapReplace = mapReplace;

  /**
   * Returns the nth occurrence of the specified substring in the string.
   * The position is 0-based.
   * Negative numbers search from the end of the string.
   * If the substring is not found or is present less times than the specified number, `-1` is returned.
   * @example ```ts
   * S.nthIndexOf("a.b.c.d.e", ".", 0); // 1
   * S.nthIndexOf("a.b.c.d.e", ".", 1); // 3
   * S.nthIndexOf("a.b.c.d.e", ".", -1); // 7
   * S.nthIndexOf("a.b.c.d.e", ".", -2); // 5
   * ```
   */
  static nthIndexOf = nthIndexOf;

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

  /** Wraps the first string in the second string. If a third string is provided, it will be used as the closing wrapper. */
  static wrap = wrap;

  /** Returns the first argument that doesn't evaluate to an empty string. */
  static or = or;

  /** Inserts a substring into the string at the specified index. */
  static insert = insert;

  /** Chunks a string into an array of substrings of the specified size. */
  static chunk = chunk;

  /** Inserts a substring every n characters, optionally starting at a given offset. */
  static insertEvery = insertEvery;
}

const WrappedS = new Proxy(S as typeof S & typeof toString, {
  apply(target, _, argumentsList) {
    return target.from(...argumentsList);
  },
});

export { WrappedS as S };
export type { Stringifiable, ToString };
