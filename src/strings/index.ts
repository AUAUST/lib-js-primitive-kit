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
  only,
  or,
  padEnd,
  padStart,
  prepend,
  random,
  remove,
  repeat,
  slug,
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
  static from = toString;

  static is = isString;

  static isNot = isNotString;

  static isStrict = isStrictString;

  static equals = equals;

  static capitalize = capitalize;

  static capitalizeWords = capitalizeWords;

  static decapitalize = decapitalize;

  static decapitalizeWords = decapitalizeWords;

  static toLowerCase = toLowerCase;

  /** @see S.toLowerCase */
  static lower = toLowerCase;

  static toUpperCase = toUpperCase;

  /** @see S.toUpperCase */
  static upper = toUpperCase;

  static toLocaleLowerCase = toLocaleLowerCase;

  static toLocaleUpperCase = toLocaleUpperCase;

  static concat = concat;

  /** @see S.concat */
  static append = concat;

  static prepend = prepend;

  static repeat = repeat;

  static splitWords = splitWords;

  static toTitleCase = toTitleCase;

  /** @see S.toTitleCase */
  static title = toTitleCase;

  static toCamelCase = toCamelCase;

  /** @see S.toCamelCase */
  static camel = toCamelCase;

  static toPascalCase = toPascalCase;

  /** @see S.toPascalCase */
  static pascal = toPascalCase;

  static toKebabCase = toKebabCase;

  /** @see S.toKebabCase */
  static kebab = toKebabCase;

  static toSnakeCase = toSnakeCase;

  /** @see S.toSnakeCase */
  static snake = toSnakeCase;

  static toCustomCase = toCustomCase;

  /** @see S.toCustomCase */
  static custom = toCustomCase;

  static unaccent = unaccent;

  static trim = trim;

  static trimStart = trimStart;

  static trimEnd = trimEnd;

  static padStart = padStart;

  static padEnd = padEnd;

  static truncateStart = truncateStart;

  static truncateEnd = truncateEnd;

  static afterFirst = afterFirst;

  /** @see S.afterFirst */
  static after = afterFirst;

  static afterLast = afterLast;

  static afterStart = afterStart;

  static afterNth = afterNth;

  static beforeFirst = beforeFirst;

  static beforeLast = beforeLast;

  /** @see S.beforeFirst */
  static before = beforeFirst;

  static beforeEnd = beforeEnd;

  static beforeNth = beforeNth;

  static between = between;

  static contains = contains;

  static startsWith = startsWith;

  static ensureStart = ensureStart;

  static endsWith = endsWith;

  static ensureEnd = ensureEnd;

  static increment = increment;

  static decrement = decrement;

  static random = random;

  static mapReplace = mapReplace;

  static nthIndexOf = nthIndexOf;

  static split = split;

  static splitFirst = splitFirst;

  static splitLast = splitLast;

  static splitNth = splitNth;

  static remove = remove;

  static wrap = wrap;

  static or = or;

  static insert = insert;

  static chunk = chunk;

  static insertEvery = insertEvery;

  static only = only;

  static slug = slug;
}

const WrappedS = new Proxy(S as typeof S & typeof toString, {
  apply(target, _, argumentsList) {
    return target.from(...argumentsList);
  },
});

export { WrappedS as S };
export type { Stringifiable, ToString };
