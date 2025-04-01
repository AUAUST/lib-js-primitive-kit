export function isNumber(num: unknown): num is number {
  return typeof num === "number" && !isNaN(num);
}
