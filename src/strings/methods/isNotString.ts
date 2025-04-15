export function isNotString<T>(value: T): value is Exclude<T, string> {
  return typeof value !== "string";
}
