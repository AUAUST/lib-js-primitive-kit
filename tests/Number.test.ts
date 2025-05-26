import { N } from "@auaust/primitive-kit";

import { describe, expect, test } from "vitest";

describe("N class", () => {
  test("called as a function works", () => {
    expect(N(2)).toBe(2);
    expect(N("2")).toBe(2);
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
