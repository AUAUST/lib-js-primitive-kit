const defaultRandomStringLength = 8;
const defaultRandomStringPools = {
  lower: "abcdefghijklmnopqrstuvwxyz",
  upper: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  numbers: "0123456789",
  symbols: "-_",
} as const;

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
    ...(typeof options === "boolean"
      ? { ignoreCaps: !!options }
      : options ?? {}),
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
    };

export function comparisonOptions(
  options?: ComparisonOptions,
  defaults?: Exclude<ComparisonOptions, boolean>
) {
  return {
    caseSensitive: false,
    trim: false,
    ...(defaults ?? {}),
    ...(typeof options === "boolean"
      ? { caseSensitive: options }
      : options ?? {}),
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
  if (typeof options === "number") {
    if (typeof chars === "string" || typeof chars === "number")
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

  if (typeof options !== "object" || options === null)
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
    (pool +=
      typeof numbers === "string" ? numbers : defaultRandomStringPools.numbers);
  symbols &&
    (pool +=
      typeof symbols === "string" ? symbols : defaultRandomStringPools.symbols);

  return {
    length: options.length ?? defaultRandomStringLength,
    pool,
  };
}
