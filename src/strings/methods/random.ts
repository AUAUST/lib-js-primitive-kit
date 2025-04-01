import { isNumber } from "~/numbers/methods";
import {
  randomStringOptions,
  type RandomStringOptions,
} from "~/strings/helpers";

export function random(options?: RandomStringOptions, chars?: string | number) {
  const { length, pool } = randomStringOptions(options, chars);

  if (length === 0) {
    return "";
  }

  if (!isFinite(length) || length < 0) {
    throw new RangeError(
      "S.random() requires a length greater than or equal to 0."
    );
  }

  if (isNumber(pool)) {
    let result = "";

    while (result.length < length) {
      result += Math.random().toString(pool).slice(2);
    }

    return result.slice(0, length);
  }

  const pL = pool.length;

  if (pL === 1) {
    return pool.repeat(length);
  }

  if (pL < 1) {
    throw new RangeError(
      "S.random() requires at least one character to be allowed."
    );
  }

  const randIndex = () => Math.floor(Math.random() * pL);

  let result = "";

  for (let i = 0; i < length; i++) {
    result += pool[randIndex()];
  }

  return result;
}
