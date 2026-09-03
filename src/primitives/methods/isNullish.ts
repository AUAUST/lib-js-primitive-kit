/**
 * Returns a boolean whether the given input is nullish.
 * Returns `true` for `null`, `undefined` and `NaN`.
 * Returns `false` for any other value.
 */
export function isNullish(input: any): input is null | undefined | typeof NaN {
  return input === null || input === undefined || Number.isNaN(input);
}
