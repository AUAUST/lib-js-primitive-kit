export function isStrictObject(obj: any): obj is Record<string, unknown> {
  return !!obj && obj.constructor === Object;
}
