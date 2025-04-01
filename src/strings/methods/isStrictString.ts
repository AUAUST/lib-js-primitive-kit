export function isStrictString(x: any): x is string {
  return typeof x === "string" && x !== "";
}
