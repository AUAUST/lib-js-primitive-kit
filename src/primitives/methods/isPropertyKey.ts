export function isPropertyKey(input: any): input is PropertyKey {
  switch (typeof input) {
    case "string":
    case "number":
    case "symbol":
      return true;
    default:
      return false;
  }
}
