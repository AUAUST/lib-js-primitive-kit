export const randomCharsPools = {
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
