import { toNumber } from "@auaust/primitive-kit/numbers";

import { describe, expect, test } from "vitest";

describe("toNumber()", () => {
  test.each([
    ["123", 123],
    ["123foo", 123],
    ["-0", -0],
    ["-123", -123],
    [123, 123],
    [0, 0],
    [-123, -123],
    [123.456, 123.456],

    // Nullish
    [null, 0],
    [undefined, 0],

    // Radix
    ["0x14", 20],
    ["0b10100", 20],
    ["0o24", 20],

    // Scientific notation
    ["7.71234e+1", 77.1234],
    ["-4.2e-1", -0.42],

    // Special cases
    ["Infinity", Infinity],
    ["-Infinity", -Infinity],

    // String handling
    ["1_000_000.5", 1_000_000.5],
    ["foo123", NaN],
    ["foo", NaN],
    ["", 0],
    ["   ", 0],

    [true, 1],
    [false, 0],
    [NaN, NaN],
    [Infinity, Infinity],
    [-Infinity, -Infinity],
    [Symbol(), NaN],

    // Objects
    [new String("123"), 123],
    [new Number(123), 123],
    [new Boolean(true), 1],
    [
      {
        valueOf() {
          return "123";
        },
      },
      123,
    ],
    [
      {
        [Symbol.toPrimitive]() {
          return "123";
        },
      },
      123,
    ],

    // Invalid cases
    [{}, NaN],
    [[], 0], // actual return type of `Number([])`, as it's getting converted to an empty string itself converted to 0
  ])("%j should return %j", (input, expected) => {
    expect(toNumber(input)).toBe(expected);
  });

  // it("should work", () => {
  //   expect(toNumber).toBeTypeOf("function");
  // });
});
