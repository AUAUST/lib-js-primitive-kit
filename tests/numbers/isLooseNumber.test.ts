import { isLooseNumber } from "@auaust/primitive-kit/numbers";

import { describe, expect, test } from "vitest";

describe("isLooseNumber()", () => {
  test.each([
    123,
    0,
    -123,
    123.456,
    NaN,
    Infinity,
    -Infinity,
    new Number(-123.23),
    new String("123"),
    "123",
    "Infinity",
    "0x14",
    "0b10100",
    {
      valueOf(): number {
        return 123;
      },
    },
  ])("should consider %s as a loose number", (num) => {
    expect(isLooseNumber(num)).toBe(true);
  });

  test.each([
    true,
    false,
    null,
    undefined,
    "foo123",
    "123foo",
    "",
    [],
    {},
    Symbol(),
  ])("should not consider %s as a loose number", (num) => {
    expect(isLooseNumber(num)).toBe(false);
  });
});
