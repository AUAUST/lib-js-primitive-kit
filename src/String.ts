import type { ComparisonOptions } from "~/strings/helpers";
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
  splitWords,
  startsWith,
  stringEquals,
  toCamelCase,
  toCustomCase,
  toKebabCase,
  toLocaleLowerCase,
  toLocaleUpperCase,
  toLowerCase,
  toSnakeCase,
  toString,
  toTitleCase,
  toUpperCamelCase,
  toUpperCase,
  trim,
  trimEnd,
  trimStart,
  truncateEnd,
  truncateStart,
  unaccent,
} from "~/strings/methods";
import type { Concatenated, Stringifiable, ToString } from "~/strings/types";

/**
 * The S class, for String, provides useful methods for working with strings.
 */
class S<T extends Stringifiable> {
  private value: ToString<T>;

  constructor(value?: T) {
    this.value = toString(value!);
  }

  valueOf() {
    return this.value;
  }
  toString() {
    return this.value;
  }
  [Symbol.toPrimitive]() {
    return this.value;
  }

  /**
   * Converts any value to a string.
   * `null` and `undefined` are converted to empty strings.
   * Non-string values are converted using `String()`.
   */
  static from = toString;

  /**
   * Returns a new instance of S from the specified value stringified.
   */
  static make<T extends Stringifiable>(value: T): S<ToString<T>> {
    return new S(value as ToString<T>);
  }

  /**
   * A simple is-string check. Shortcut for `typeof x === "string"`.
   */
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
   * Compares `this` string with another string.
   */
  equals(str: Stringifiable, options?: ComparisonOptions): str is ToString<T> {
    return stringEquals(this.value, str, options);
  }

  /**
   * Capitalizes the first letter of a string, letting the rest as-is.
   * I.e. "hello world" becomes "Hello world", "HTML" stays "HTML", "hTML" becomes "HTML".
   */
  static capitalize = capitalize;

  /** Capitalizes the first letter of `this` string, letting the rest as-is. */
  capitalize() {
    return new S(capitalize(this.value));
  }

  /** Converts all the alphabetic characters in a string to lowercase. */
  static toLowerCase = toLowerCase;

  /** Converts all the alphabetic characters in `this` string to lowercase. */
  toLowerCase() {
    return new S(toLowerCase(this.value));
  }

  /** Converts all the alphabetic characters in a string to uppercase. */
  static toUpperCase = toUpperCase;

  /** Converts all the alphabetic characters in `this` string to uppercase. */
  toUpperCase() {
    return new S(toUpperCase(this.value));
  }

  /** Returns a string where all alphabetic characters have been converted to lowercase, taking into account the host environment's current locale. */
  static toLocaleLowerCase = toLocaleLowerCase;

  /** Returns a string where all alphabetic characters have been converted to lowercase, taking into account the host environment's current locale. */
  toLocaleLowerCase() {
    return new S(toLocaleLowerCase(this.value));
  }

  /** Returns a string where all alphabetic characters have been converted to uppercase, taking into account the host environment's current locale. */
  static toLocaleUpperCase = toLocaleUpperCase;

  /** Returns a string where all alphabetic characters have been converted to uppercase, taking into account the host environment's current locale. */
  toLocaleUpperCase() {
    return new S(toLocaleUpperCase(this.value));
  }

  /**
   * Concatenates multiple strings, with an optional separator.
   * The separator is an empty string by default. To pass a separator, pass an object with a `separator` property as the last argument.
   */
  static concat = concat;

  /**
   * Concatenates `this` string with the specified strings, with an optional separator.
   * The separator is an empty string by default. To pass a separator, pass an object with a `separator` property as the last argument.
   */
  // concat<P extends Parameters<typeof concat>>(...strings: P) {
  //   return new S(concat(this.value, ...strings)) as S<Concatenated<[T, ...P], "a">>;
  // }
  concat<
    P extends Stringifiable[],
    L extends { separator: Stringifiable } | Stringifiable
  >(
    ...args: [...P, L]
  ): S<
    L extends { separator: Stringifiable }
      ? Concatenated<[T, ...P], L["separator"]>
      : L extends Stringifiable
      ? Concatenated<[T, ...P, L], "">
      : never
  > {
    return new S(concat(this.value, ...args)) as any;
  }

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
   * Splits `this` string into an array of words.
   * Considers all non-alphanumeric characters as well as capital letters as word boundaries.
   * All non-alphanumeric characters are excluded from the result.
   *
   * @param ignoreCaps Whether to ignore capital letters as word boundaries.
   * Is useful if the input is uppercase; defeats the purpose if the input is in a case that uses capital letters as word boundaries.
   */
  splitWords(ignoreCaps?: boolean) {
    return splitWords(this.value, ignoreCaps);
  }

  /**
   * Converts a string to Title Case.
   * It only splits the string by spaces.
   *
   * Since Title Case aims to be displayed
   */
  static toTitleCase = toTitleCase;

  /**
   * Converts `this` string to Title Case.
   * It only splits the string by spaces.
   *
   * Since Title Case aims to be displayed
   */
  toTitleCase() {
    return new S(toTitleCase(this.value));
  }

  /**
   * Converts a string to camelCase.
   * Use `toUpperCamelCase()` to convert to UpperCamelCase (or PascalCase).
   */
  static toCamelCase = toCamelCase;

  /**
   * Converts `this` string to camelCase.
   * Use `toUpperCamelCase()` to convert to UpperCamelCase (or PascalCase).
   */
  toCamelCase() {
    return new S(toCamelCase(this.value));
  }

  /**
   * Converts a string to UpperCamelCase, also known as PascalCase.
   * Use `toCamelCase()` to convert to camelCase.
   */
  static toUpperCamelCase = toUpperCamelCase;

  /**
   * Converts `this` string to UpperCamelCase, also known as PascalCase.
   * Use `toCamelCase()` to convert to camelCase.
   */
  toUpperCamelCase() {
    return new S(toUpperCamelCase(this.value));
  }

  /**
   * Converts a string to kebab-case.
   */
  static toKebabCase = toKebabCase;

  /**
   * Converts `this` string to kebab-case.
   */
  toKebabCase() {
    return new S(toKebabCase(this.value));
  }

  /**
   * Converts a string to snake_case.
   */
  static toSnakeCase = toSnakeCase;

  /**
   * Converts `this` string to snake_case.
   */
  toSnakeCase() {
    return new S(toSnakeCase(this.value));
  }

  /**
   * Converts a string to a configurable case.
   */
  static toCustomCase = toCustomCase;

  /**
   * Converts `this` string to a configurable case.
   */
  toCustomCase(options: Parameters<typeof toCustomCase>[1]) {
    return new S(toCustomCase(this.value, options));
  }

  /**
   * Removes accents from a string. Useful for i.e. URL slugs.
   * `ﬁ` becomes `fi`, `à` becomes `a`, etc.
   *
   * Some characters are also typographically inaccurately replaced, such as `œ` and `æ` becoming `oe` and `ae` respectively.
   * Despite technically being entirely different letters, it's most of the time the expected behavior when unaccenting a string.
   */
  static unaccent = unaccent;

  /**
   * Removes accents from `this` string. Useful for i.e. URL slugs.
   * `ﬁ` becomes `fi`, `à` becomes `a`, etc.
   *
   * Some characters are also typographically inaccurately replaced, such as `œ` and `æ` becoming `oe` and `ae` respectively.
   * Despite technically being entirely different letters, it's most of the time the expected behavior when unaccenting a string.
   */
  unaccent() {
    return new S(unaccent(this.value));
  }

  /**
   * Trims a string on both ends, removing the specified characters or pattern, or spaces by default.
   * Warning: providing a string of multiple characters will remove all occurrences of each character, not the whole string.
   */
  static trim = trim;

  /**
   * Trims `this` string on both ends, removing the specified characters or pattern, or spaces by default.
   * Warning: providing a string of multiple characters will remove all occurrences of each character, not the whole string.
   */
  trim(chars?: Parameters<typeof trim>[1]) {
    return new S(trim(this.value, chars));
  }

  /**
   * Trims a string on the left, removing the specified characters or pattern, or spaces by default.
   * Warning: providing a string of multiple characters will remove all occurrences of each character, not the whole string.
   */
  static trimStart = trimStart;

  /**
   * Trims `this` string on the left, removing the specified characters or pattern, or spaces by default.
   * Warning: providing a string of multiple characters will remove all occurrences of each character, not the whole string.
   */
  trimStart(chars?: Parameters<typeof trimStart>[1]) {
    return new S(trimStart(this.value, chars));
  }

  /**
   * Trims a string on the right, removing the specified characters or pattern, or spaces by default.
   * Warning: providing a string of multiple characters will remove all occurrences of each character, not the whole string.
   */
  static trimEnd = trimEnd;

  /**
   * Trims `this` string on the right, removing the specified characters or pattern, or spaces by default.
   * Warning: providing a string of multiple characters will remove all occurrences of each character, not the whole string.
   */
  trimEnd(chars?: Parameters<typeof trimEnd>[1]) {
    return new S(trimEnd(this.value, chars));
  }

  /**
   * Pads the left side of a string with the specified characters, or spaces by default, until the string reaches the specified length.
   */
  static padStart = padStart;

  /**
   * Pads the left side of `this` string with the specified characters, or spaces by default, until the string reaches the specified length.
   */
  padStart(length: number, chars?: Parameters<typeof padStart>[1]) {
    return new S(padStart(this.value, length, chars));
  }

  /**
   * Pads the right side of a string with the specified characters, or spaces by default, until the string reaches the specified length.
   */
  static padEnd = padEnd;

  /**
   * Pads the right side of `this` string with the specified characters, or spaces by default, until the string reaches the specified length.
   */
  padEnd(length: number, chars?: Parameters<typeof padEnd>[1]) {
    return new S(padEnd(this.value, length, chars));
  }

  /**
   * Truncates the left side of a string to the specified length.
   * If the string is longer than the specified length and an ellipsis string is provided, the overhanging characters are replaced by the ellipsis.
   */
  static truncateStart = truncateStart;

  /**
   * Truncates the left side of `this` string to the specified length.
   * If the string is longer than the specified length and an ellipsis string is provided, the overhanging characters are replaced by the ellipsis.
   */
  truncateStart(length: number, ellipsis?: string) {
    return new S(truncateStart(this.value, length, ellipsis));
  }

  /**
   * Truncates the right side of a string to the specified length.
   * If the string is longer than the specified length and an ellipsis string is provided, the overhanging characters are replaced by the ellipsis.
   */
  static truncateEnd = truncateEnd;

  /**
   * Truncates the right side of `this` string to the specified length.
   * If the string is longer than the specified length and an ellipsis string is provided, the overhanging characters are replaced by the ellipsis.
   */
  truncateEnd(length: number, ellipsis?: string) {
    return new S(truncateEnd(this.value, length, ellipsis));
  }

  /**
   * Returns the substring after the first occurrence of a specified substring.
   * If the substring is not found, returns an empty string.
   */
  static afterFirst = afterFirst;

  /**
   * Returns the substring after the last occurrence of a specified substring in `this` string.
   * If the substring is not found, returns an empty string.
   */
  afterFirst(substring: Stringifiable) {
    return new S(afterFirst(this.value, substring));
  }

  /**
   * Returns the substring after the last occurrence of a specified substring.
   * If the substring is not found, returns an empty string.
   */
  static afterLast = afterLast;

  /**
   * Returns the substring after the last occurrence of a specified substring in `this` string.
   * If the substring is not found, returns an empty string.
   */
  afterLast(substring: Stringifiable) {
    return new S(afterLast(this.value, substring));
  }

  /**
   * Returns the substring after the first occurrence of a specified substring, only if the substring is at the beginning of the string.
   * If the substring isn't found at the beginning of the string, returns an empty string.
   */
  static afterStart = afterStart;

  /**
   * Returns the substring after the first occurrence of a specified substring, only if the substring is at the beginning of the string.
   * If the substring isn't found at the beginning of the string, returns an empty string.
   */
  afterStart(substring: Stringifiable) {
    return new S(afterStart(this.value, substring));
  }

  /**
   * Returns the substring before the first occurrence of a specified substring.
   * If the substring is not found, returns an empty string.
   */
  static beforeFirst = beforeFirst;

  /**
   * Returns the substring before the first occurrence of a specified substring in `this` string.
   * If the substring is not found, returns an empty string.
   */
  beforeFirst(substring: Stringifiable) {
    return new S(beforeFirst(this.value, substring));
  }

  /**
   * Returns the substring before the last occurrence of a specified substring.
   * If the substring is not found, returns an empty string.
   */
  static beforeLast = beforeLast;

  /**
   * Returns the substring before the last occurrence of a specified substring in `this` string.
   * If the substring is not found, returns an empty string.
   */
  beforeLast(substring: Stringifiable) {
    return new S(beforeLast(this.value, substring));
  }

  /**
   * Returns the substring before the first occurrence of a specified substring, only if the substring is at the end of the string.
   * If the substring isn't found at the end of the string, returns an empty string.
   */
  static beforeEnd = beforeEnd;

  /**
   * Returns the substring before the first occurrence of a specified substring, only if the substring is at the end of the string.
   * If the substring isn't found at the end of the string, returns an empty string.
   */
  beforeEnd(substring: Stringifiable) {
    return new S(beforeEnd(this.value, substring));
  }

  /**
   * Returns the substring between the first occurrence of a specified substring and the last occurrence of another specified substring.
   * If either of the substrings is not found, returns an empty string.
   */
  static between = between;

  /**
   * Returns the substring between the first occurrence of a specified substring and the last occurrence of another specified substring in `this` string.
   * If either of the substrings is not found, returns an empty string.
   */
  between(start: Stringifiable, end: Stringifiable) {
    return new S(between(this.value, start, end));
  }

  /**
   * Returns a boolean whether the string contains the specified substring.
   * The last argument provides options for the comparison.
   */
  static contains = contains;

  /**
   * Returns a boolean whether the string contains the specified substring.
   * The last argument provides options for the comparison.
   */
  contains(substring: Stringifiable, options?: ComparisonOptions) {
    return contains(this.value, substring, options);
  }

  /**
   * Returns a boolean whether the string starts with the specified substring.
   * The last argument provides options for the comparison.
   */
  static startsWith = startsWith;

  /**
   * Returns a boolean whether the string starts with the specified substring.
   * The last argument provides options for the comparison.
   */
  startsWith(substring: Stringifiable, options?: ComparisonOptions) {
    return startsWith(this.value, substring, options);
  }

  /**
   * Returns a boolean whether the string ends with the specified substring.
   * The last argument provides options for the comparison.
   */
  static endsWith = endsWith;

  /**
   * Returns a boolean whether the string ends with the specified substring.
   * The last argument provides options for the comparison.
   */
  endsWith(substring: Stringifiable, options?: ComparisonOptions) {
    return endsWith(this.value, substring, options);
  }

  /**
   * Increments the number suffix of a string, or adds a new one.
   */
  static increment = increment;

  /**
   * Increments the number suffix of a string, or adds a new one.
   */
  increment() {
    return new S(increment(this.value));
  }

  /**
   * Decrements the number suffix of a string.
   */
  static decrement = decrement;

  /**
   * Decrements the number suffix of a string.
   */
  decrement() {
    return new S(decrement(this.value));
  }

  /**
   * Generates a random string of the specified length.
   * The argument can either be a number, in which case it will be used as the length of the string, or an object with options.
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
   * Takes a map of strings and replaces all occurrences of the keys with their values.
   * You may pass a 2-dimentional array with regexes as first values for more complex replacements.
   *
   * The third argument, `replaceAll`, is only used when the first argument is a string.
   * Use the global flag on the regexes if you want to replace all occurrences of a regex.
   */
  mapReplace(map: Parameters<typeof mapReplace>[1], replaceAll?: boolean) {
    return new S(mapReplace(this.value, map, replaceAll));
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
