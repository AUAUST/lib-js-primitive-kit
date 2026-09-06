// This file is generated. Do not edit it directly.

import type { Stringifiable, ToString } from "./types";

import { afterFirst } from "./methods/afterFirst";
import { afterLast } from "./methods/afterLast";
import { afterNth } from "./methods/afterNth";
import { afterStart } from "./methods/afterStart";
import { beforeEnd } from "./methods/beforeEnd";
import { beforeFirst } from "./methods/beforeFirst";
import { beforeLast } from "./methods/beforeLast";
import { beforeNth } from "./methods/beforeNth";
import { between } from "./methods/between";
import { capitalize } from "./methods/capitalize";
import { capitalizeWords } from "./methods/capitalizeWords";
import { chunk } from "./methods/chunk";
import { concat } from "./methods/concat";
import { contains } from "./methods/contains";
import { decapitalize } from "./methods/decapitalize";
import { decapitalizeWords } from "./methods/decapitalizeWords";
import { decrement } from "./methods/decrement";
import { endsWith } from "./methods/endsWith";
import { ensureEnd } from "./methods/ensureEnd";
import { ensureStart } from "./methods/ensureStart";
import { equals } from "./methods/equals";
import { increment } from "./methods/increment";
import { insert } from "./methods/insert";
import { insertEvery } from "./methods/insertEvery";
import { isNotEmpty } from "./methods/isNotEmpty";
import { isNotString } from "./methods/isNotString";
import { isString } from "./methods/isString";
import { mapReplace } from "./methods/mapReplace";
import { nthIndexOf } from "./methods/nthIndexOf";
import { only } from "./methods/only";
import { or } from "./methods/or";
import { padEnd } from "./methods/padEnd";
import { padStart } from "./methods/padStart";
import { prepend } from "./methods/prepend";
import { random } from "./methods/random";
import { remove } from "./methods/remove";
import { repeat } from "./methods/repeat";
import { slug } from "./methods/slug";
import { split } from "./methods/split";
import { splitFirst } from "./methods/splitFirst";
import { splitLast } from "./methods/splitLast";
import { splitNth } from "./methods/splitNth";
import { splitWords } from "./methods/splitWords";
import { startsWith } from "./methods/startsWith";
import { toCamelCase } from "./methods/toCamelCase";
import { toCustomCase } from "./methods/toCustomCase";
import { toKebabCase } from "./methods/toKebabCase";
import { toLocaleLowerCase } from "./methods/toLocaleLowerCase";
import { toLocaleUpperCase } from "./methods/toLocaleUpperCase";
import { toLowerCase } from "./methods/toLowerCase";
import { toPascalCase } from "./methods/toPascalCase";
import { toSnakeCase } from "./methods/toSnakeCase";
import { toString } from "./methods/toString";
import { toTitleCase } from "./methods/toTitleCase";
import { toUpperCase } from "./methods/toUpperCase";
import { trim } from "./methods/trim";
import { trimEnd } from "./methods/trimEnd";
import { trimStart } from "./methods/trimStart";
import { truncateEnd } from "./methods/truncateEnd";
import { truncateStart } from "./methods/truncateStart";
import { unaccent } from "./methods/unaccent";
import { wrap } from "./methods/wrap";

type FacadeMethodArguments<Method extends (...args: any[]) => any> =
  Parameters<Method> extends [unknown, ...infer Args] ? Args : never;

class SBase<
  const Input extends Stringifiable,
  Value extends string = ToString<NoInfer<Input>>,
> {
  readonly value: Value;

  constructor(value: Input) {
    this.value = toString(value) as ToString<Input> & Value;
  }

  get length(): number {
    return this.value.length;
  }

  toString(): Value {
    return this.value;
  }

  valueOf(): Value {
    return this.value;
  }

  [Symbol.toPrimitive](): Value {
    return this.value;
  }

  [Symbol.iterator]() {
    return this.value[Symbol.iterator]();
  }
}

class SFacade<const Input extends Stringifiable, Value extends string = ToString<NoInfer<Input>>> extends SBase<Input, Value> {
  /**
   * Returns the substring after the first occurrence of a specified substring.
   * If the substring is not found, returns an empty string.
   */
  declare afterFirst: <U extends Stringifiable>(...args: FacadeMethodArguments<typeof afterFirst<Value, U>>) => SFacade<ReturnType<typeof afterFirst<Value, U>>>;
  /** @alias S.afterFirst */
  declare after: <U extends Stringifiable>(...args: FacadeMethodArguments<typeof afterFirst<Value, U>>) => SFacade<ReturnType<typeof afterFirst<Value, U>>>;
  /**
   * Returns the substring after the last occurrence of a specified substring.
   * If the substring is not found, returns an empty string.
   */
  declare afterLast: (...args: FacadeMethodArguments<typeof afterLast>) => SFacade<ReturnType<typeof afterLast>>;
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
  declare afterNth: (...args: FacadeMethodArguments<typeof afterNth>) => SFacade<ReturnType<typeof afterNth>>;
  /**
   * Returns the substring after the first occurrence of a specified substring, only if the substring is at the beginning of the string.
   * If the substring isn't found at the beginning of the string, returns an empty string.
   */
  declare afterStart: <U extends Stringifiable>(...args: FacadeMethodArguments<typeof afterStart<Value, U>>) => SFacade<ReturnType<typeof afterStart<Value, U>>>;
  /**
   * Returns the substring before the first occurrence of a specified substring, only if the substring is at the end of the string.
   * If the substring isn't found at the end of the string, returns an empty string.
   */
  declare beforeEnd: <U extends Stringifiable>(...args: FacadeMethodArguments<typeof beforeEnd<Value, U>>) => SFacade<ReturnType<typeof beforeEnd<Value, U>>>;
  /**
   * Returns the substring before the first occurrence of a specified substring.
   * If the substring is not found, returns an empty string.
   */
  declare beforeFirst: <U extends Stringifiable>(...args: FacadeMethodArguments<typeof beforeFirst<Value, U>>) => SFacade<ReturnType<typeof beforeFirst<Value, U>>>;
  /** @alias S.beforeFirst */
  declare before: <U extends Stringifiable>(...args: FacadeMethodArguments<typeof beforeFirst<Value, U>>) => SFacade<ReturnType<typeof beforeFirst<Value, U>>>;
  /**
   * Returns the substring before the last occurrence of a specified substring.
   * If the substring is not found, returns an empty string.
   */
  declare beforeLast: (...args: FacadeMethodArguments<typeof beforeLast>) => SFacade<ReturnType<typeof beforeLast>>;
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
  declare beforeNth: (...args: FacadeMethodArguments<typeof beforeNth>) => SFacade<ReturnType<typeof beforeNth>>;
  /**
   * Returns the substring between the first occurrence of a specified substring and the last occurrence of another specified substring.
   * If either of the substrings is not found, returns an empty string.
   */
  declare between: (...args: FacadeMethodArguments<typeof between>) => SFacade<ReturnType<typeof between>>;
  /**
   * Capitalizes the first letter of a string, letting the rest as-is.
   * I.e. "hello world" becomes "Hello world", "HTML" stays "HTML", "hTML" becomes "HTML".
   */
  declare capitalize: (...args: FacadeMethodArguments<typeof capitalize<Value>>) => SFacade<ReturnType<typeof capitalize<Value>>>;
  /**
   * Capitalizes the first letter of each word in a string.
   */
  declare capitalizeWords: (...args: FacadeMethodArguments<typeof capitalizeWords>) => SFacade<ReturnType<typeof capitalizeWords>>;
  /**
   * Chunks a string into an array of substrings of the specified size.
   */
  declare chunk: (...args: FacadeMethodArguments<typeof chunk>) => ReturnType<typeof chunk>;
  /**
   * Concatenates multiple strings, with an optional separator.
   * The separator is an empty string by default. To pass a separator, pass an object with a `separator` property as the last argument.
   */
  declare concat: <A extends Stringifiable[], L extends { separator: Stringifiable }>(...args: FacadeMethodArguments<typeof concat<Value, A, L>>) => SFacade<ReturnType<typeof concat<Value, A, L>>>;
  /**
   * Returns a boolean whether the string contains the specified substring.
   * The last argument provides options for the comparison.
   */
  declare contains: <T extends Stringifiable>(...args: FacadeMethodArguments<typeof contains<T>>) => ReturnType<typeof contains<T>>;
  /**
   * Decapitalize the first letter of a string, letting the rest as-is.
   * I.e. "Hello" becomes "hello", "HTML" stays "HTML", "hTML" becomes "hTML".
   */
  declare decapitalize: (...args: FacadeMethodArguments<typeof decapitalize<Value>>) => SFacade<ReturnType<typeof decapitalize<Value>>>;
  /**
   * Decpitalize the first letter of each word in a string.
   */
  declare decapitalizeWords: (...args: FacadeMethodArguments<typeof decapitalizeWords>) => SFacade<ReturnType<typeof decapitalizeWords>>;
  /**
   * Decrements the number suffix of a string.
   */
  declare decrement: (...args: FacadeMethodArguments<typeof decrement>) => SFacade<ReturnType<typeof decrement>>;
  /**
   * Returns a boolean whether the string ends with the specified substring.
   * The last argument provides options for the comparison.
   */
  declare endsWith: <T extends Stringifiable>(...args: FacadeMethodArguments<typeof endsWith<T>>) => ReturnType<typeof endsWith<T>>;
  /**
   * Ensures the string ends with the provided substring.
   * If the string already ends with the substring, it is returned as-is.
   * Otherwise, the substring is appended to the string.
   */
  declare ensureEnd: <T extends Stringifiable>(...args: FacadeMethodArguments<typeof ensureEnd<T>>) => SFacade<ReturnType<typeof ensureEnd<T>>>;
  /**
   * Ensures the string starts with the provided substring.
   * If the string already starts with the substring, it is returned as-is.
   * Otherwise, the substring is prepended to the string.
   */
  declare ensureStart: <T extends Stringifiable>(...args: FacadeMethodArguments<typeof ensureStart<T>>) => SFacade<ReturnType<typeof ensureStart<T>>>;
  /**
   * Compares two strings.
   * Returns a boolean whether the two strings are equal.
   * The last argument provides options for the comparison.
   * Case-insensitive by default.
   */
  declare equals: (...args: FacadeMethodArguments<typeof equals<Value>>) => ReturnType<typeof equals<Value>>;
  /**
   * Increments the number suffix of a string, or adds a new one.
   */
  declare increment: (...args: FacadeMethodArguments<typeof increment>) => SFacade<ReturnType<typeof increment>>;
  /**
   * Inserts a substring into the string at the specified index.
   */
  declare insert: <T extends Stringifiable>(...args: FacadeMethodArguments<typeof insert<T>>) => SFacade<ReturnType<typeof insert<T>>>;
  /**
   * Inserts a substring every n characters, optionally starting at a given offset.
   */
  declare insertEvery: (...args: FacadeMethodArguments<typeof insertEvery>) => SFacade<ReturnType<typeof insertEvery>>;
  /**
   * A strict is-string check.
   * Returns true only for primitive strings, which length is greater than 0.
   */
  declare isNotEmpty: (...args: FacadeMethodArguments<typeof isNotEmpty>) => ReturnType<typeof isNotEmpty>;
  /** @alias S.isNotEmpty */
  declare isStrict: (...args: FacadeMethodArguments<typeof isNotEmpty>) => ReturnType<typeof isNotEmpty>;
  /**
   * Takes a map of strings and replaces all occurrences of the keys with their values.
   * You may pass a 2-dimentional array with regexes as first values for more complex replacements.
   *
   * The third argument, `replaceAll`, is only used when the first argument is a string.
   * Use the global flag on the regexes if you want to replace all occurrences of a regex.
   */
  declare mapReplace: (...args: FacadeMethodArguments<typeof mapReplace>) => SFacade<ReturnType<typeof mapReplace>>;
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
  declare nthIndexOf: (...args: FacadeMethodArguments<typeof nthIndexOf>) => ReturnType<typeof nthIndexOf>;
  /**
   * Returns a string where characters that don't match the provided characters or regex are removed.
   */
  declare only: (...args: FacadeMethodArguments<typeof only>) => ReturnType<typeof only>;
  /**
   * Returns the first argument that doesn't evaluate to an empty string.
   */
  declare or: (...args: FacadeMethodArguments<typeof or>) => SFacade<ReturnType<typeof or>>;
  /**
   * Pads the right side of a string with the specified characters,
   * or spaces by default, until the string reaches the specified length.
   */
  declare padEnd: (...args: FacadeMethodArguments<typeof padEnd>) => SFacade<ReturnType<typeof padEnd>>;
  /**
   * Pads the left side of a string with the specified characters,
   * or spaces by default, until the string reaches the specified length.
   */
  declare padStart: (...args: FacadeMethodArguments<typeof padStart>) => SFacade<ReturnType<typeof padStart>>;
  /**
   * Prepends the provided strings to the target string.
   */
  declare prepend: <T extends Stringifiable[], L extends { separator: Stringifiable }>(...args: FacadeMethodArguments<typeof prepend<Value, T, L>>) => SFacade<ReturnType<typeof prepend<Value, T, L>>>;
  /**
   * Removes all occurrences of the specified substring from the string.
   */
  declare remove: (...args: FacadeMethodArguments<typeof remove>) => SFacade<ReturnType<typeof remove>>;
  /**
   * Repeats a string the specified number of times.
   */
  declare repeat: (...args: FacadeMethodArguments<typeof repeat<Value>>) => SFacade<ReturnType<typeof repeat<Value>>>;
  /**
   * Returns the string in a slug format, suitable for URLs.
   */
  declare slug: (...args: FacadeMethodArguments<typeof slug>) => SFacade<ReturnType<typeof slug>>;
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
  declare split: <D extends Stringifiable>(...args: FacadeMethodArguments<typeof split<Value, D>>) => ReturnType<typeof split<Value, D>>;
  /**
   * Splits the string into two parts at the first occurrence of the specified substring.
   * If the substring is not found, returns the full string as the first part and an empty string as the second part.
   * @example ```ts
   * S.splitFirst("a.b.c.d.e", "."); // ["a", "b.c.d.e"]
   * S.splitFirst("a.b.c.d.e", "-"); // ["a.b.c.d.e", ""]
   * ```
   */
  declare splitFirst: <T extends Stringifiable, U extends Stringifiable>(...args: FacadeMethodArguments<typeof splitFirst<T, U>>) => ReturnType<typeof splitFirst<T, U>>;
  /**
   * Splits the string into two parts at the last occurrence of the specified substring.
   * If the substring is not found, returns the full string as the first part and an empty string as the second part.
   * @example ```ts
   * S.splitLast("a.b.c.d.e", "."); // ["a.b.c.d", "e"]
   * S.splitLast("a.b.c.d.e", "-"); // ["a.b.c.d.e", ""]
   */
  declare splitLast: (...args: FacadeMethodArguments<typeof splitLast>) => ReturnType<typeof splitLast>;
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
  declare splitNth: (...args: FacadeMethodArguments<typeof splitNth>) => ReturnType<typeof splitNth>;
  /**
   * Splits a string into an array of words.
   * Considers all non-alphanumeric characters as well as capital letters as word boundaries.
   * All non-alphanumeric characters are excluded from the result.
   *
   * @param ignoreCaps Whether to ignore capital letters as word boundaries.
   * Is useful if the input is uppercase; defeats the purpose if the input is in a case that uses capital letters as word boundaries.
   */
  declare splitWords: (...args: FacadeMethodArguments<typeof splitWords>) => ReturnType<typeof splitWords>;
  /**
   * Returns a boolean whether the string starts with the specified substring.
   * The last argument provides options for the comparison.
   */
  declare startsWith: <T extends Stringifiable>(...args: FacadeMethodArguments<typeof startsWith<T>>) => ReturnType<typeof startsWith<T>>;
  /**
   * Converts a string to camelCase.
   * Use `toPascalCase()` to convert to PascalCase (or UpperCamelCase).
   */
  declare toCamelCase: (...args: FacadeMethodArguments<typeof toCamelCase>) => SFacade<ReturnType<typeof toCamelCase>>;
  /** @alias S.toCamelCase */
  declare camel: (...args: FacadeMethodArguments<typeof toCamelCase>) => SFacade<ReturnType<typeof toCamelCase>>;
  /**
   * Converts a string to a configurable case.
   */
  declare toCustomCase: (...args: FacadeMethodArguments<typeof toCustomCase>) => SFacade<ReturnType<typeof toCustomCase>>;
  /** @alias S.toCustomCase */
  declare custom: (...args: FacadeMethodArguments<typeof toCustomCase>) => SFacade<ReturnType<typeof toCustomCase>>;
  /**
   * Converts a string to kebab-case.
   */
  declare toKebabCase: (...args: FacadeMethodArguments<typeof toKebabCase>) => SFacade<ReturnType<typeof toKebabCase>>;
  /** @alias S.toKebabCase */
  declare kebab: (...args: FacadeMethodArguments<typeof toKebabCase>) => SFacade<ReturnType<typeof toKebabCase>>;
  /**
   * Returns a string where all alphabetic characters have been converted to lowercase, taking into account the host environment's current locale.
   */
  declare toLocaleLowerCase: (...args: FacadeMethodArguments<typeof toLocaleLowerCase>) => SFacade<ReturnType<typeof toLocaleLowerCase>>;
  /**
   * Returns a string where all alphabetic characters have been converted to uppercase, taking into account the host environment's current locale.
   */
  declare toLocaleUpperCase: (...args: FacadeMethodArguments<typeof toLocaleUpperCase>) => SFacade<ReturnType<typeof toLocaleUpperCase>>;
  /**
   * Converts all the alphabetic characters in a string to lowercase.
   */
  declare toLowerCase: (...args: FacadeMethodArguments<typeof toLowerCase<Value>>) => SFacade<ReturnType<typeof toLowerCase<Value>>>;
  /** @alias S.toLowerCase */
  declare lower: (...args: FacadeMethodArguments<typeof toLowerCase<Value>>) => SFacade<ReturnType<typeof toLowerCase<Value>>>;
  /**
   * Converts a string to PascalCase, also known as UpperCamelCase.
   * Use `toCamelCase()` to convert to camelCase.
   */
  declare toPascalCase: (...args: FacadeMethodArguments<typeof toPascalCase>) => SFacade<ReturnType<typeof toPascalCase>>;
  /** @alias S.toPascalCase */
  declare pascal: (...args: FacadeMethodArguments<typeof toPascalCase>) => SFacade<ReturnType<typeof toPascalCase>>;
  /** @alias S.toPascalCase */
  declare toUpperCamelCase: (...args: FacadeMethodArguments<typeof toPascalCase>) => SFacade<ReturnType<typeof toPascalCase>>;
  /**
   * Converts a string to snake_case.
   */
  declare toSnakeCase: (...args: FacadeMethodArguments<typeof toSnakeCase>) => SFacade<ReturnType<typeof toSnakeCase>>;
  /** @alias S.toSnakeCase */
  declare snake: (...args: FacadeMethodArguments<typeof toSnakeCase>) => SFacade<ReturnType<typeof toSnakeCase>>;
  /**
   * Converts a string to Title Case.
   * It only splits the string by spaces.
   */
  declare toTitleCase: (...args: FacadeMethodArguments<typeof toTitleCase>) => SFacade<ReturnType<typeof toTitleCase>>;
  /** @alias S.toTitleCase */
  declare title: (...args: FacadeMethodArguments<typeof toTitleCase>) => SFacade<ReturnType<typeof toTitleCase>>;
  /**
   * Converts all the alphabetic characters in a string to uppercase.
   */
  declare toUpperCase: (...args: FacadeMethodArguments<typeof toUpperCase<Value>>) => SFacade<ReturnType<typeof toUpperCase<Value>>>;
  /** @alias S.toUpperCase */
  declare upper: (...args: FacadeMethodArguments<typeof toUpperCase<Value>>) => SFacade<ReturnType<typeof toUpperCase<Value>>>;
  /**
   * Trims a string on both ends, removing the specified characters or pattern, or spaces by default.
   * Warning: providing a string of multiple characters will remove all occurrences of each character, not the whole string.
   */
  declare trim: (...args: FacadeMethodArguments<typeof trim>) => SFacade<ReturnType<typeof trim>>;
  /**
   * Trims a string on the right, removing the specified characters or pattern, or spaces by default.
   * Warning: providing a string of multiple characters will remove all occurrences of each character, not the whole string.
   */
  declare trimEnd: (...args: FacadeMethodArguments<typeof trimEnd>) => SFacade<ReturnType<typeof trimEnd>>;
  /**
   * Trims a string on the left, removing the specified characters or pattern, or spaces by default.
   * Warning: providing a string of multiple characters will remove all occurrences of each character, not the whole string.
   */
  declare trimStart: (...args: FacadeMethodArguments<typeof trimStart>) => SFacade<ReturnType<typeof trimStart>>;
  /**
   * Truncates the right side of a string to the specified length.
   * If the string is longer than the specified length and an ellipsis string is provided,
   * the overhanging characters are replaced by the ellipsis.
   */
  declare truncateEnd: (...args: FacadeMethodArguments<typeof truncateEnd>) => SFacade<ReturnType<typeof truncateEnd>>;
  /** @alias S.truncateEnd */
  declare ellipsis: (...args: FacadeMethodArguments<typeof truncateEnd>) => SFacade<ReturnType<typeof truncateEnd>>;
  /**
   * Truncates the left side of a string to the specified length.
   * If the string is longer than the specified length and an ellipsis string is provided,
   * the overhanging characters are replaced by the ellipsis.
   */
  declare truncateStart: (...args: FacadeMethodArguments<typeof truncateStart>) => SFacade<ReturnType<typeof truncateStart>>;
  /**
   * Removes accents from a string. Useful for i.e. URL slugs.
   * `ﬁ` becomes `fi`, `à` becomes `a`, etc.
   *
   * Some characters are also typographically inaccurately replaced, such as `œ` and `æ` becoming `oe` and `ae` respectively.
   * Despite technically being entirely different letters, it's most of the time the expected behavior when unaccenting a string.
   */
  declare unaccent: (...args: FacadeMethodArguments<typeof unaccent>) => SFacade<ReturnType<typeof unaccent>>;
  /**
   * Wraps the first string in the second string. If a third string is provided, it will be used as the closing wrapper.
   */
  declare wrap: <B extends Stringifiable>(...args: FacadeMethodArguments<typeof wrap<Value, B>>) => SFacade<ReturnType<typeof wrap<Value, B>>>;
}

const S = Object.assign(SFacade, {
  /**
   * Returns the substring after the first occurrence of a specified substring.
   * If the substring is not found, returns an empty string.
   */
  afterFirst,
  /** @alias S.afterFirst */
  after: afterFirst,
  /**
   * Returns the substring after the last occurrence of a specified substring.
   * If the substring is not found, returns an empty string.
   */
  afterLast,
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
  afterNth,
  /**
   * Returns the substring after the first occurrence of a specified substring, only if the substring is at the beginning of the string.
   * If the substring isn't found at the beginning of the string, returns an empty string.
   */
  afterStart,
  /**
   * Returns the substring before the first occurrence of a specified substring, only if the substring is at the end of the string.
   * If the substring isn't found at the end of the string, returns an empty string.
   */
  beforeEnd,
  /**
   * Returns the substring before the first occurrence of a specified substring.
   * If the substring is not found, returns an empty string.
   */
  beforeFirst,
  /** @alias S.beforeFirst */
  before: beforeFirst,
  /**
   * Returns the substring before the last occurrence of a specified substring.
   * If the substring is not found, returns an empty string.
   */
  beforeLast,
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
  beforeNth,
  /**
   * Returns the substring between the first occurrence of a specified substring and the last occurrence of another specified substring.
   * If either of the substrings is not found, returns an empty string.
   */
  between,
  /**
   * Capitalizes the first letter of a string, letting the rest as-is.
   * I.e. "hello world" becomes "Hello world", "HTML" stays "HTML", "hTML" becomes "HTML".
   */
  capitalize,
  /**
   * Capitalizes the first letter of each word in a string.
   */
  capitalizeWords,
  /**
   * Chunks a string into an array of substrings of the specified size.
   */
  chunk,
  /**
   * Concatenates multiple strings, with an optional separator.
   * The separator is an empty string by default. To pass a separator, pass an object with a `separator` property as the last argument.
   */
  concat,
  /**
   * Returns a boolean whether the string contains the specified substring.
   * The last argument provides options for the comparison.
   */
  contains,
  /**
   * Decapitalize the first letter of a string, letting the rest as-is.
   * I.e. "Hello" becomes "hello", "HTML" stays "HTML", "hTML" becomes "hTML".
   */
  decapitalize,
  /**
   * Decpitalize the first letter of each word in a string.
   */
  decapitalizeWords,
  /**
   * Decrements the number suffix of a string.
   */
  decrement,
  /**
   * Returns a boolean whether the string ends with the specified substring.
   * The last argument provides options for the comparison.
   */
  endsWith,
  /**
   * Ensures the string ends with the provided substring.
   * If the string already ends with the substring, it is returned as-is.
   * Otherwise, the substring is appended to the string.
   */
  ensureEnd,
  /**
   * Ensures the string starts with the provided substring.
   * If the string already starts with the substring, it is returned as-is.
   * Otherwise, the substring is prepended to the string.
   */
  ensureStart,
  /**
   * Compares two strings.
   * Returns a boolean whether the two strings are equal.
   * The last argument provides options for the comparison.
   * Case-insensitive by default.
   */
  equals,
  /**
   * Increments the number suffix of a string, or adds a new one.
   */
  increment,
  /**
   * Inserts a substring into the string at the specified index.
   */
  insert,
  /**
   * Inserts a substring every n characters, optionally starting at a given offset.
   */
  insertEvery,
  /**
   * A strict is-string check.
   * Returns true only for primitive strings, which length is greater than 0.
   */
  isNotEmpty,
  /** @alias S.isNotEmpty */
  isStrict: isNotEmpty,
  /**
   * Is-not-string check. Shortcut for `typeof x !== "string"`.
   */
  isNotString,
  /**
   * Is-string check. Shortcut for `typeof x === "string"`.
   */
  isString,
  /** @alias S.isString */
  is: isString,
  /**
   * Takes a map of strings and replaces all occurrences of the keys with their values.
   * You may pass a 2-dimentional array with regexes as first values for more complex replacements.
   *
   * The third argument, `replaceAll`, is only used when the first argument is a string.
   * Use the global flag on the regexes if you want to replace all occurrences of a regex.
   */
  mapReplace,
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
  nthIndexOf,
  /**
   * Returns a string where characters that don't match the provided characters or regex are removed.
   */
  only,
  /**
   * Returns the first argument that doesn't evaluate to an empty string.
   */
  or,
  /**
   * Pads the right side of a string with the specified characters,
   * or spaces by default, until the string reaches the specified length.
   */
  padEnd,
  /**
   * Pads the left side of a string with the specified characters,
   * or spaces by default, until the string reaches the specified length.
   */
  padStart,
  /**
   * Prepends the provided strings to the target string.
   */
  prepend,
  /**
   * Generates a random string of the specified length.
   * The first argument can either be a number, in which case it will be used as the length of the string, or an object with options.
   * If a number is passed as the charset, it will be used as the radix to stringify random numbers.
   *
   * IMPORTANT: This method is not cryptographically secure.
   */
  random,
  /**
   * Removes all occurrences of the specified substring from the string.
   */
  remove,
  /**
   * Repeats a string the specified number of times.
   */
  repeat,
  /**
   * Returns the string in a slug format, suitable for URLs.
   */
  slug,
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
  split,
  /**
   * Splits the string into two parts at the first occurrence of the specified substring.
   * If the substring is not found, returns the full string as the first part and an empty string as the second part.
   * @example ```ts
   * S.splitFirst("a.b.c.d.e", "."); // ["a", "b.c.d.e"]
   * S.splitFirst("a.b.c.d.e", "-"); // ["a.b.c.d.e", ""]
   * ```
   */
  splitFirst,
  /**
   * Splits the string into two parts at the last occurrence of the specified substring.
   * If the substring is not found, returns the full string as the first part and an empty string as the second part.
   * @example ```ts
   * S.splitLast("a.b.c.d.e", "."); // ["a.b.c.d", "e"]
   * S.splitLast("a.b.c.d.e", "-"); // ["a.b.c.d.e", ""]
   */
  splitLast,
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
  splitNth,
  /**
   * Splits a string into an array of words.
   * Considers all non-alphanumeric characters as well as capital letters as word boundaries.
   * All non-alphanumeric characters are excluded from the result.
   *
   * @param ignoreCaps Whether to ignore capital letters as word boundaries.
   * Is useful if the input is uppercase; defeats the purpose if the input is in a case that uses capital letters as word boundaries.
   */
  splitWords,
  /**
   * Returns a boolean whether the string starts with the specified substring.
   * The last argument provides options for the comparison.
   */
  startsWith,
  /**
   * Converts a string to camelCase.
   * Use `toPascalCase()` to convert to PascalCase (or UpperCamelCase).
   */
  toCamelCase,
  /** @alias S.toCamelCase */
  camel: toCamelCase,
  /**
   * Converts a string to a configurable case.
   */
  toCustomCase,
  /** @alias S.toCustomCase */
  custom: toCustomCase,
  /**
   * Converts a string to kebab-case.
   */
  toKebabCase,
  /** @alias S.toKebabCase */
  kebab: toKebabCase,
  /**
   * Returns a string where all alphabetic characters have been converted to lowercase, taking into account the host environment's current locale.
   */
  toLocaleLowerCase,
  /**
   * Returns a string where all alphabetic characters have been converted to uppercase, taking into account the host environment's current locale.
   */
  toLocaleUpperCase,
  /**
   * Converts all the alphabetic characters in a string to lowercase.
   */
  toLowerCase,
  /** @alias S.toLowerCase */
  lower: toLowerCase,
  /**
   * Converts a string to PascalCase, also known as UpperCamelCase.
   * Use `toCamelCase()` to convert to camelCase.
   */
  toPascalCase,
  /** @alias S.toPascalCase */
  pascal: toPascalCase,
  /** @alias S.toPascalCase */
  toUpperCamelCase: toPascalCase,
  /**
   * Converts a string to snake_case.
   */
  toSnakeCase,
  /** @alias S.toSnakeCase */
  snake: toSnakeCase,
  /**
   * Converts any value to a primitive string.
   * `null` and `undefined` are converted to empty strings.
   * Non-string values are converted using `String()`.
   */
  toString,
  /** @alias S.toString */
  from: toString,
  /**
   * Converts a string to Title Case.
   * It only splits the string by spaces.
   */
  toTitleCase,
  /** @alias S.toTitleCase */
  title: toTitleCase,
  /**
   * Converts all the alphabetic characters in a string to uppercase.
   */
  toUpperCase,
  /** @alias S.toUpperCase */
  upper: toUpperCase,
  /**
   * Trims a string on both ends, removing the specified characters or pattern, or spaces by default.
   * Warning: providing a string of multiple characters will remove all occurrences of each character, not the whole string.
   */
  trim,
  /**
   * Trims a string on the right, removing the specified characters or pattern, or spaces by default.
   * Warning: providing a string of multiple characters will remove all occurrences of each character, not the whole string.
   */
  trimEnd,
  /**
   * Trims a string on the left, removing the specified characters or pattern, or spaces by default.
   * Warning: providing a string of multiple characters will remove all occurrences of each character, not the whole string.
   */
  trimStart,
  /**
   * Truncates the right side of a string to the specified length.
   * If the string is longer than the specified length and an ellipsis string is provided,
   * the overhanging characters are replaced by the ellipsis.
   */
  truncateEnd,
  /** @alias S.truncateEnd */
  ellipsis: truncateEnd,
  /**
   * Truncates the left side of a string to the specified length.
   * If the string is longer than the specified length and an ellipsis string is provided,
   * the overhanging characters are replaced by the ellipsis.
   */
  truncateStart,
  /**
   * Removes accents from a string. Useful for i.e. URL slugs.
   * `ﬁ` becomes `fi`, `à` becomes `a`, etc.
   *
   * Some characters are also typographically inaccurately replaced, such as `œ` and `æ` becoming `oe` and `ae` respectively.
   * Despite technically being entirely different letters, it's most of the time the expected behavior when unaccenting a string.
   */
  unaccent,
  /**
   * Wraps the first string in the second string. If a third string is provided, it will be used as the closing wrapper.
   */
  wrap,
});

function _wrap(method: any) {
  return function (this: { valueOf(): unknown }, ...args: any[]) {
    return method(this.valueOf(), ...args);
  };
}

function _wrapChainable(method: any) {
  return function (this: { valueOf(): unknown }, ...args: any[]) {
    return new SFacade(method(this.valueOf(), ...args));
  };
}

let _wrapped: (...args: any[]) => any;

Object.assign(SFacade.prototype, {
  afterFirst: (_wrapped = _wrapChainable(afterFirst)),
  after: _wrapped,
  afterLast: _wrapChainable(afterLast),
  afterNth: _wrapChainable(afterNth),
  afterStart: _wrapChainable(afterStart),
  beforeEnd: _wrapChainable(beforeEnd),
  beforeFirst: (_wrapped = _wrapChainable(beforeFirst)),
  before: _wrapped,
  beforeLast: _wrapChainable(beforeLast),
  beforeNth: _wrapChainable(beforeNth),
  between: _wrapChainable(between),
  capitalize: _wrapChainable(capitalize),
  capitalizeWords: _wrapChainable(capitalizeWords),
  chunk: _wrap(chunk),
  concat: _wrapChainable(concat),
  contains: _wrap(contains),
  decapitalize: _wrapChainable(decapitalize),
  decapitalizeWords: _wrapChainable(decapitalizeWords),
  decrement: _wrapChainable(decrement),
  endsWith: _wrap(endsWith),
  ensureEnd: _wrapChainable(ensureEnd),
  ensureStart: _wrapChainable(ensureStart),
  equals: _wrap(equals),
  increment: _wrapChainable(increment),
  insert: _wrapChainable(insert),
  insertEvery: _wrapChainable(insertEvery),
  isNotEmpty: (_wrapped = _wrap(isNotEmpty)),
  isStrict: _wrapped,
  mapReplace: _wrapChainable(mapReplace),
  nthIndexOf: _wrap(nthIndexOf),
  only: _wrap(only),
  or: _wrapChainable(or),
  padEnd: _wrapChainable(padEnd),
  padStart: _wrapChainable(padStart),
  prepend: _wrapChainable(prepend),
  remove: _wrapChainable(remove),
  repeat: _wrapChainable(repeat),
  slug: _wrapChainable(slug),
  split: _wrap(split),
  splitFirst: _wrap(splitFirst),
  splitLast: _wrap(splitLast),
  splitNth: _wrap(splitNth),
  splitWords: _wrap(splitWords),
  startsWith: _wrap(startsWith),
  toCamelCase: (_wrapped = _wrapChainable(toCamelCase)),
  camel: _wrapped,
  toCustomCase: (_wrapped = _wrapChainable(toCustomCase)),
  custom: _wrapped,
  toKebabCase: (_wrapped = _wrapChainable(toKebabCase)),
  kebab: _wrapped,
  toLocaleLowerCase: _wrapChainable(toLocaleLowerCase),
  toLocaleUpperCase: _wrapChainable(toLocaleUpperCase),
  toLowerCase: (_wrapped = _wrapChainable(toLowerCase)),
  lower: _wrapped,
  toPascalCase: (_wrapped = _wrapChainable(toPascalCase)),
  pascal: _wrapped,
  toUpperCamelCase: _wrapped,
  toSnakeCase: (_wrapped = _wrapChainable(toSnakeCase)),
  snake: _wrapped,
  toTitleCase: (_wrapped = _wrapChainable(toTitleCase)),
  title: _wrapped,
  toUpperCase: (_wrapped = _wrapChainable(toUpperCase)),
  upper: _wrapped,
  trim: _wrapChainable(trim),
  trimEnd: _wrapChainable(trimEnd),
  trimStart: _wrapChainable(trimStart),
  truncateEnd: (_wrapped = _wrapChainable(truncateEnd)),
  ellipsis: _wrapped,
  truncateStart: _wrapChainable(truncateStart),
  unaccent: _wrapChainable(unaccent),
  wrap: _wrapChainable(wrap),
});

const WrappedS = new Proxy(S as typeof S & typeof toString, {
  apply(_target, _thisArgument, argumentsList) {
    return toString(...argumentsList);
  },
});

export { WrappedS as S };

export type { AfterFirst } from "./methods/afterFirst";
export type { AfterStart } from "./methods/afterStart";
export type { BeforeEnd } from "./methods/beforeEnd";
export type { BeforeFirst } from "./methods/beforeFirst";
export type { Split } from "./methods/split";
export type { SplitFirst } from "./methods/splitFirst";
export type { Concatenated, GetStringifiableValue, Stringifiable, ToString } from "./types";
