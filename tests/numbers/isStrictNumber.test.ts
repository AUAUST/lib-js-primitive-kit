import { isStrictNumber } from "@auaust/primitive-kit/numbers";

import { describe, expect, test } from "vitest";

describe("isStrictNumber()", () => {
  test.each([123, 0, -0, 123.456, -123])(
    "should consider %s as a strict number",
    (num) => {
      expect(isStrictNumber(num)).toBe(true);
    }
  );

  test.each([
    Infinity,
    -Infinity,
    NaN,
    new Number(123),
    true,
    false,
    null,
    undefined,
    "123",
    "foo123",
    "123foo",
    {},
    [],
  ])("should not consider %s as a strict number", (num) => {
    expect(isStrictNumber(num)).toBe(false);
  });
});
