/**
 * The S class, for String, provides useful methods for working with strings.
 */
class S extends String {
  /**
   * A simple is-string check.
   * Returns true both for primitive strings and String objects.
   */
  static is(x: any): x is string | String {
    return typeof x === "string" || x instanceof String;
  }

  /**
   * A strict is-string check.
   * Returns true only for primitive strings, which length is greater than 0.
   */
  static isStrict(x: any): x is string {
    return typeof x === "string" && x !== "";
  }
}

export { S };
