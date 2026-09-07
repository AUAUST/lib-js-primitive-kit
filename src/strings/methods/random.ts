import { randomStringOptions } from "~/strings/helpers";
import type { RandomStringOptions } from "~/strings/types";

/**
 * Generates a random string of the specified length.
 * The first argument can either be a number, in which case it will be used as the length of the string, or an object with options.
 * If a number is passed as the charset, it will be used as the radix to stringify random numbers.
 *
 * IMPORTANT: This method is not cryptographically secure.
 */
export function random(options?: RandomStringOptions, chars?: string | number) {
  const { length, pool } = randomStringOptions(options, chars);

  if (length === 0) {
    return "";
  }

  if (!isFinite(length) || length < 0) {
    throw new RangeError(
      "S.random() requires a length greater than or equal to 0.",
    );
  }

  if (pool.length === 1) {
    return pool.repeat(length);
  }

  if (pool.length < 1) {
    throw new RangeError(
      "S.random() requires at least one character to be allowed.",
    );
  }

  const buffer = new Uint8Array(length);

  crypto.getRandomValues(buffer);

  let result = "";

  for (let i = 0; i < length; i++) {
    result += pool[buffer[i] % pool.length];
  }

  return result;
}
