import { isBoolean } from "~/booleans/methods";
import { isNumber } from "~/numbers/methods";
import { isObject } from "~/objects/methods";
import { isString } from "~/strings/methods/isString";
import { toString } from "~/strings/methods/toString";
import type { Stringifiable } from "./types";

/**
 * Used by case-modifying methods to determine how to handle casing.
 * If used as a boolean, it will be used as the `ignoreCaps` option.
 *
 * `ignoreCaps` is always `false` by default.
 * `unaccent` is always `true` by default.
 */
export type CasingOptions =
  | boolean
  | {
      ignoreCaps?: boolean;
      unaccent?: boolean;
    };

export function casingOptions(
  options?: CasingOptions,
  defaults?: Exclude<CasingOptions, boolean>
) {
  return {
    ignoreCaps: false,
    unaccent: true,
    ...(defaults ?? {}),
    ...(isBoolean(options) ? { ignoreCaps: options } : options ?? {}),
  };
}

/**
 * Used by string-comparing methods to determine how to proceed to the comparison.
 * If used as a boolean, it will be used as the `caseInsensitive` option.
 *
 * `caseInsensitive` is always `true` by default.
 */
export type ComparisonOptions =
  | boolean
  | {
      caseSensitive?: boolean;
      trim?: boolean;
      unaccent?: boolean;
    };

export function comparisonOptions(
  options?: ComparisonOptions,
  defaults?: Exclude<ComparisonOptions, boolean>
) {
  return {
    caseSensitive: false,
    trim: false,
    unaccent: false,
    ...(defaults ?? {}),
    ...(isBoolean(options) ? { caseSensitive: options } : options ?? {}),
  };
}

export type RandomStringOptions =
  | number
  | ({
      length?: number;
    } & (
      | {
          /**
           * A string containing the complete list of allowed characters.
           * If specified, all other options are ignored except `length`.
           */
          chars: string | number;
        }
      | {
          /** The case of the letters. */
          case?: "lower" | "upper" | "mixed";
          /** Whether to include numbers, or a string of numbers to use. */
          numbers?: boolean | string;
          /** Whether to include symbols, or a string of symbols to use. If `true`, uses `-` and `_`. */
          symbols?: boolean | string;
        }
    ));

const defaultRandomStringLength = 8;
const defaultRandomStringPools = {
  lower: "abcdefghijklmnopqrstuvwxyz",
  upper: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  numbers: "0123456789",
  symbols: "-_",
} as const;

/**
 * Used by the random string generator to determine the output.
 * If used as a number, it will be used as the `length` option.
 */
export function randomStringOptions(
  options?: RandomStringOptions,
  chars?: string | number
): {
  length: number;
  pool: string | number;
} {
  if (isNumber(options)) {
    if (isString(chars) || isNumber(chars))
      return {
        length: options,
        pool: chars!,
      };

    return {
      length: options,
      pool:
        defaultRandomStringPools.lower +
        defaultRandomStringPools.upper +
        defaultRandomStringPools.numbers,
    };
  }

  if (!isObject(options))
    return {
      length: defaultRandomStringLength,
      pool:
        defaultRandomStringPools.lower +
        defaultRandomStringPools.upper +
        defaultRandomStringPools.numbers,
    };

  if ("chars" in options)
    return {
      length: options.length ?? defaultRandomStringLength,
      pool: options.chars,
    };

  const { case: casing, numbers, symbols } = options;

  let pool = "";
  switch (casing?.toLowerCase()) {
    case "mixed":
    case "lower":
      pool += defaultRandomStringPools.lower;
      break;
    case "upper":
      pool += defaultRandomStringPools.upper;
      break;
  }

  numbers &&
    (pool += isString(numbers) ? numbers : defaultRandomStringPools.numbers);
  symbols &&
    (pool += isString(symbols) ? symbols : defaultRandomStringPools.symbols);

  return {
    length: options.length ?? defaultRandomStringLength,
    pool,
  };
}

export function concatOptions(
  options: [...Stringifiable[], { separator: Stringifiable } | Stringifiable]
): {
  separator: string;
  strings: Stringifiable[];
} {
  if (options.length === 0) {
    return { separator: "", strings: [] };
  }

  if (options.length === 1) {
    return { separator: "", strings: options };
  }

  const last = options[options.length - 1];

  if (last instanceof Object && "separator" in last) {
    const separator = last.separator;
    options.pop();

    return {
      separator: toString(separator),
      strings: options,
    };
  }

  return {
    separator: "",
    strings: options,
  };
}
