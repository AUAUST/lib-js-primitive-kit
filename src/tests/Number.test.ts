import { N } from "~/numbers";

import { describe, expect, test } from "vitest";

describe("N class", () => {
  test("called as a function works", () => {
    [
      "",
      new String(""),
      0,
      new Number(0),
      {},
      [],
      null,
      undefined,
      "false",
      "true",
    ].forEach((x) => {
      expect(N(x)).toBe(N.from(x));
    });
  });

  test("conversion to number works", () => {
    expect(N.from("123")).toBe(123);
    expect(N.from("foo123")).toBe(123);
    expect(N.from("123foo")).toBe(123);
    expect(N.from("-0")).toBe(0);
    expect(N.from("-123")).toBe(-123);

    expect(N.from("foo")).toBe(NaN);
    expect(N.from("")).toBe(0);
    expect(N.from(" ")).toBe(0);

    expect(N.from(123)).toBe(123);
    expect(N.from(0)).toBe(0);
    expect(N.from(-123)).toBe(-123);
    expect(N.from(123.456)).toBe(123.456);

    expect(N.from(true)).toBe(1);
    expect(N.from(false)).toBe(0);

    expect(N.from(null)).toBe(0);
    expect(N.from(undefined)).toBe(0);

    expect(N.from({})).toBe(NaN);
    expect(N.from([])).toBe(0);

    expect(N.from(new String("123"))).toBe(123);
    expect(N.from(new Number(123))).toBe(123);
    expect(N.from(new Boolean(true))).toBe(1);

    expect(
      N.from({
        valueOf() {
          return "123";
        },
      })
    ).toBe(123);

    expect(
      N.from({
        [Symbol.toPrimitive]() {
          return "123";
        },
      })
    ).toBe(123);
  });

  test("normal typecheck works", () => {
    expect(N.is(123)).toBe(true);
    expect(N.is(0)).toBe(true);
    expect(N.is(-123)).toBe(true);
    expect(N.is(123.456)).toBe(true);
    expect(N.is(NaN)).toBe(false);
    expect(N.is(Infinity)).toBe(true);
    expect(N.is(-Infinity)).toBe(true);

    expect(N.is(new Number(123))).toBe(false);

    expect(N.is(true)).toBe(false);
    expect(N.is(null)).toBe(false);
    expect(N.is(undefined)).toBe(false);

    expect(N.is("123")).toBe(false);

    expect(N.is({})).toBe(false);
    expect(N.is([])).toBe(false);
  });

  test("strict typecheck works", () => {
    expect(N.isStrict(123)).toBe(true);
    expect(N.isStrict(0)).toBe(true);
    expect(N.isStrict(-123)).toBe(true);
    expect(N.isStrict(123.456)).toBe(true);
    expect(N.isStrict(NaN)).toBe(false);
    expect(N.isStrict(Infinity)).toBe(false);
    expect(N.isStrict(-Infinity)).toBe(false);

    expect(N.isStrict(new Number(123))).toBe(false);
    expect(N.isStrict(new Number(0))).toBe(false);
    expect(N.isStrict(new String("123"))).toBe(false);

    expect(N.isStrict(true)).toBe(false);
    expect(N.isStrict(false)).toBe(false);
    expect(N.isStrict(null)).toBe(false);
    expect(N.isStrict(undefined)).toBe(false);

    expect(N.isStrict("123")).toBe(false);
    expect(N.isStrict("foo123")).toBe(false);
    expect(N.isStrict("123foo")).toBe(false);

    expect(N.isStrict({})).toBe(false);
    expect(N.isStrict([])).toBe(false);
  });

  test("loose typecheck works", () => {
    expect(N.isLoose(-123.456)).toBe(true);
    expect(N.isLoose(NaN)).toBe(true);
    expect(N.isLoose(Infinity)).toBe(true);
    expect(N.isLoose(-Infinity)).toBe(true);

    expect(N.isLoose(new Number(-123.23))).toBe(true);
    expect(N.isLoose(new String("123"))).toBe(true);

    expect(N.isLoose(true)).toBe(false);
    expect(N.isLoose(null)).toBe(false);
    expect(N.isLoose(undefined)).toBe(false);

    expect(N.isLoose("123")).toBe(true);
    expect(N.isLoose("Infinity")).toBe(true);
    expect(N.isLoose("foo123")).toBe(false);

    expect(
      N.isLoose({
        valueOf() {
          return 123;
        },
      })
    ).toBe(true);
    expect(N.isLoose([])).toBe(false);
  });

  test("toExponential() works", () => {
    expect(N.toExponential("2", "3")).toBe("2.000e+0");
  });

  test("toFixed() works", () => {
    expect(N.toFixed("2", "3")).toBe("2.000");
    expect(N.toFixed("Foo2.42Bar", 0)).toBe("2");
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

  test("sum() works", () => {
    expect(N.sum("0.3", new String("12"), 1)).toBe(13.3);
  });

  test("subtract() works", () => {
    expect(N.subtract("1000", 100, "20", new String("3"))).toBe(877);
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
});
