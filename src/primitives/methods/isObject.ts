export function isObject(input: any): input is object {
  return !!input && (typeof input === "object" || typeof input === "function");
}
