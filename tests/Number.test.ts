import { N } from "@auaust/primitive-kit";

import { describe, expect, test } from "vitest";

describe("N class", () => {
  test("called as a function works", () => {
    expect(N(2)).toBe(2);
    expect(N("2")).toBe(2);
  });

  test("conversion to number works", () => {
    const cases: [actual: unknown, expected: number][] = [
      // Simple cases
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

      // Primitives
      [true, 1],
      [false, 0],
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
    ];

    for (const [actual, expected] of cases) {
      expect(N.from(actual)).toBe(expected);
    }
  });

  test("is() and isNot() works", () => {
    const numbers = [123, 0, -123, 123.456, Infinity, -Infinity];

    const notNumbers = [
      NaN,
      new Number(123),
      true,
      null,
      undefined,
      "123",
      {},
      [],
    ];

    for (const num of numbers) {
      expect(N.is(num)).toBe(true);
      expect(N.isNot(num)).toBe(false);
    }

    for (const num of notNumbers) {
      expect(N.is(num)).toBe(false);
      expect(N.isNot(num)).toBe(true);
    }
  });

  test("strict typecheck works", () => {
    const strictNumbers = [123, 0, -123, 123.456];

    for (const num of strictNumbers) {
      expect(N.isStrict(num)).toBe(true);
    }

    const notNumbers = [
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
    ];

    for (const num of notNumbers) {
      expect(N.isStrict(num)).toBe(false);
    }
  });

  test("loose typecheck works", () => {
    const looseNumbers = [
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
      {
        valueOf() {
          return 123;
        },
      },
    ];

    for (const num of looseNumbers) {
      expect(N.isLoose(num)).toBe(true);
    }

    const notLooseNumbers = [
      true,
      false,
      null,
      undefined,
      "foo123",
      "", // while this would be converted to 0 by `Number()`, it doesn't actually represent a number
      [],
    ];

    for (const num of notLooseNumbers) {
      expect(N.isLoose(num)).toBe(false);
    }
  });

  test("toExponential() works", () => {
    expect(N.toExponential("2", "3")).toBe("2.000e+0");
  });

  test("toFixed() works", () => {
    expect(N.toFixed("2", "3")).toBe("2.000");
    expect(N.toFixed("2.42Bar", 0)).toBe("2");
  });

  test("toPrecision() works", () => {
    expect(N.toPrecision("2", "3")).toBe("2.00");
  });

  test("toString() works", () => {
    expect(N.toString("2", "3")).toBe("2");
  });

  test("toFormattedString() works", () => {
    expect(N.toFormattedString("2")).toBe("2");
    expect(N.toFormattedString(2.42)).toBe("2.42");
    expect(N.toFormattedString(20000.5)).toBe("20,000.5");

    expect(
      N.toFormattedString(1901122.46, {
        decimalSeparator: "$",
        thousandsSeparator: "€",
        fractionDigits: 1,
      })
    ).toBe("1€901€122$5");
  });

  test("isInteger() works", () => {
    expect(N.isInteger(2)).toBe(true);
    expect(N.isInteger("2")).toBe(true);
    expect(N.isInteger(2.42)).toBe(false);
    expect(N.isInteger(2.0)).toBe(true);
    expect(
      N.isInteger({
        toString() {
          return "1.0";
        },
      })
    ).toBe(true);
  });

  test("hasDecimal() works", () => {
    expect(N.hasDecimal(Math.PI)).toBe(true);
    expect(N.hasDecimal(2)).toBe(false);
    expect(N.hasDecimal(2.0)).toBe(false);
    expect(N.hasDecimal("2")).toBe(false);
    expect(N.hasDecimal(2.42)).toBe(true);
    expect(
      N.hasDecimal({
        toString() {
          return "1.1";
        },
      })
    ).toBe(true);
  });

  test("toLocaleString() works", () => {
    expect(N.toLocaleString(2)).toBe("2");
    expect(N.toLocaleString(2.42, "en-US")).toBe("2.42");
    expect(N.toLocaleString(2.42, "fr-FR")).toBe("2,42");

    expect(
      N.toLocaleString(2.42, "en-US", { style: "currency", currency: "USD" })
    ).toBe("$2.42");
  });

  test("min() works", () => {
    expect(N.min("0.3", new String("12"), 1)).toBe(0.3);
  });

  test("max() works", () => {
    expect(N.max("0.3", new String("12"), 1)).toBe(12);
  });

  test("minMax() works", () => {
    expect(N.minMax("0.3", new String("12"), 1)).toEqual([0.3, 12]);
    expect(N.minMax(-Infinity, Infinity, 3)).toEqual([-Infinity, Infinity]);
    expect(N.minMax(NaN, 3)).toEqual([NaN, NaN]); // NaN is not comparable
  });

  test("sum() works", () => {
    expect(N.sum("0.3", new String("12"), 1)).toBe(13.3);
    expect(N.sum(4, 3)).toBe(4 + 3);
    expect(N.sum(6, 3, 5, 10, 10)).toBe(6 + 3 + 5 + 10 + 10);

    expect(N.sum).toBe(N.add);
  });

  test("subtract() works", () => {
    expect(N.subtract("1000", 100, "20", new String("3"))).toBe(877);
    expect(N.subtract(6, 3, 5, "10", 10)).toBe(6 - 3 - 5 - 10 - 10);

    expect(N.subtract).toBe(N.sub);
  });

  test("multiply() works", () => {
    expect(N.multiply("0.3", new String("12"), 1)).toBe(0.3 * 12);
    expect(N.multiply(6, 3, 5, 10, 10)).toBe(6 * 3 * 5 * 10 * 10);

    expect(N.multiply).toBe(N.mul);
  });

  test("divide() works", () => {
    expect(N.divide(new String("12"), "3", 1)).toBe(12 / 3);
    expect(N.divide(10, 5, 2)).toBe(10 / 5 / 2);

    expect(N.divide).toBe(N.div);
  });

  test("remainder() works", () => {
    expect(N.remainder(2.5)).toBe(0.5); // implicit use of 1
    expect(N.remainder(4, 2)).toBe(0);
    expect(N.remainder(6, 4)).toBe(2);

    expect(N.remainder).toBe(N.mod);
  });

  test("power() works", () => {
    expect(N.power(2, "0")).toBe(2 ** 0);
    expect(N.power(2, -3)).toBe(2 ** -3);

    expect(N.power).toBe(N.pow);
  });

  test("average() works", () => {
    expect(N.average("2", new String("12"), 1)).toBe(5);
  });

  test("randInt() works", () => {
    expect(N.randInt("1", 20)).toBeGreaterThanOrEqual(1);
    expect(N.randInt("1", 20)).toBeLessThanOrEqual(20);
    expect(Number.isInteger(N.randInt())).toBe(true);

    {
      let sum = 0,
        iterations = 100;

      for (let i = 0; i < iterations; i++) {
        sum += N.randInt();
      }

      expect(sum).toBeGreaterThan(0);
      expect(sum).toBeLessThan(iterations * 100);
      expect(Number.isInteger(sum)).toBe(true);
    }
  });

  test("randFloat() works", () => {
    expect(N.randFloat("0.3", 10)).toBeGreaterThanOrEqual(0.3);
    expect(N.randFloat("0.3", 10)).toBeLessThanOrEqual(10);

    expect(N.randFloat()).toBeGreaterThanOrEqual(0);
    expect(N.randFloat()).toBeLessThanOrEqual(1);

    {
      let sum = 0,
        iterations = 100;

      for (let i = 0; i < iterations; i++) {
        sum += N.randFloat();
      }

      expect(sum).toBeGreaterThan(0);
      expect(sum).toBeLessThan(iterations);
    }
  });

  test("isEven() works", () => {
    expect(N.isEven(0)).toBe(true);
    expect(N.isEven(2)).toBe(true);
    expect(N.isEven(3)).toBe(false);
    expect(N.isEven(2.42)).toBe(false);
    expect(N.isEven(2.0)).toBe(true);
    expect(N.isEven(-1)).toBe(false);
    expect(N.isEven(-1292)).toBe(true);
    expect(
      N.isEven({
        toString() {
          return "1.0";
        },
      })
    ).toBe(false);
  });

  test("isOdd() works", () => {
    expect(N.isOdd(0)).toBe(false);
    expect(N.isOdd(2)).toBe(false);
    expect(N.isOdd(3)).toBe(true);
    expect(N.isOdd(2.42)).toBe(false);
    expect(N.isOdd(2.0)).toBe(false);
    expect(N.isOdd(-1)).toBe(true);
    expect(N.isOdd(-1292)).toBe(false);
    expect(
      N.isOdd({
        toString() {
          return "1.0";
        },
      })
    ).toBe(true);
  });

  test("isMultipleOf() works", () => {
    expect(N.isMultipleOf(2, 2)).toBe(true);
    expect(N.isMultipleOf(3, 2)).toBe(false);
    expect(N.isMultipleOf(2.42, 2)).toBe(false);
    expect(N.isMultipleOf(2.0, 2)).toBe(true);
    expect(N.isMultipleOf(4.5, "1.5")).toBe(true);
  });

  test("abs() works", () => {
    expect(N.abs(2)).toBe(2);
    expect(N.abs(-2)).toBe(2);
    expect(N.abs("2.42")).toBe(2.42);
    expect(N.abs("  -2.42 ")).toBe(2.42);
  });

  test("clamp() works", () => {
    expect(N.clamp(2, 3, 5)).toBe(3);
    expect(N.clamp(4, 3, 5)).toBe(4);
    expect(N.clamp(6, 3, 5)).toBe(5);
  });

  test("floor() works", () => {
    expect(N.floor(2.42)).toBe(2);
    expect(N.floor(-2.42)).toBe(-3);
    expect(N.floor("2.42")).toBe(2);
  });

  test("ceil() works", () => {
    expect(N.ceil(2.42)).toBe(3);
    expect(N.ceil(-2.42)).toBe(-2);
    expect(N.ceil("2.42")).toBe(3);
  });

  test("round() works", () => {
    expect(N.round(2.42)).toBe(2);
    expect(N.round(2.52)).toBe(3);
    expect(N.round(-2.42)).toBe(-2);
    expect(N.round("2.42")).toBe(2);
    expect(N.round("2.52")).toBe(3);

    expect(N.round(2.42, 0.5)).toBe(2.5);
    expect(N.round(2.52, 5)).toBe(5);

    expect(N.round(2.5, 0)).toBe(3);
    expect(N.round(2.5, NaN)).toBe(3);
  });

  test("isBetween() works", () => {
    expect(N.isBetween(2, 3, 5)).toBe(false);
    expect(N.isBetween(4, 3, 5)).toBe(true);
    expect(N.isBetween(6, 3, 5)).toBe(false);
  });

  test("isPositive() works", () => {
    expect(N.isPositive(2)).toBe(true);
    expect(N.isPositive(0)).toBe(false);
    expect(N.isPositive(-2)).toBe(false);

    expect(N.isPositive("2.42")).toBe(true);
  });

  test("isNegative() works", () => {
    expect(N.isNegative(2)).toBe(false);
    expect(N.isNegative(0)).toBe(false);
    expect(N.isNegative(-2)).toBe(true);

    expect(N.isNegative("2.42")).toBe(false);
    expect(N.isNegative("-4.24")).toBe(true);
  });

  test("or() works", () => {
    expect(N.or()).toBe(NaN);
    expect(N.or(2, 3)).toBe(2);
    expect(N.or(-1, 3)).toBe(-1);
    expect(N.or(0, NaN)).toBe(0);
    expect(N.or(NaN, Infinity, 0)).toBe(Infinity);
  });
});
