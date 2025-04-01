export function isSet<T>(input: T): input is NonNullable<T> {
  return input !== null && input !== undefined && input !== "undefined";
}
