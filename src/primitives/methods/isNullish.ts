export function isNullish(input: any): input is null | undefined | typeof NaN {
  return input === null || input === undefined || Number.isNaN(input);
}
