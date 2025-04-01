export function isPrimitive(input: any): input is string | number | boolean {
  switch (typeof input) {
    case "string":
    case "number":
    case "boolean":
      return true;
    default:
      return false;
  }
}
