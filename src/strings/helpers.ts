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

export function casingOptions(options?: CasingOptions) {
  return typeof options === "boolean"
    ? {
        ignoreCaps: options,
        unaccent: true,
      }
    : {
        ignoreCaps: options?.ignoreCaps ?? false,
        unaccent: options?.unaccent ?? true,
      };
}

export const randomCharsPools = {
  lower: "abcdefghijklmnopqrstuvwxyz",
  upper: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  numbers: "0123456789",
  symbols: "-_",
} as const;
