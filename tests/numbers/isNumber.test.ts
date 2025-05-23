import { isNumber, isNotNumber } from "@auaust/primitive-kit/numbers";

import { describe, expect, it, test } from "vitest";

describe("isNumber() and isNotNumber()", () => {
  const numbers = [123, 0, -123, 123.456, Infinity, -Infinity];

  const notNumbers = [
    NaN,
    new Number(123),
    true,
    null,
    undefined,
    "123",
    {},
    [[]],
  ];

  test.each(numbers)("should consider %s as a number", (num) => {
    expect(isNumber(num)).toBe(true);
    expect(isNotNumber(num)).toBe(false);
  });

  test.each(notNumbers)("should consider %s as not a number", (num) => {
    expect(isNumber(num)).toBe(false);
    expect(isNotNumber(num)).toBe(true);
  });
});
