import { isBetween } from "@auaust/primitive-kit/numbers";

import { describe, expect, it } from "vitest";

describe("isBetween()", () => {
  it("should return true if the number is between the two bounds inclusive", () => {
    expect(isBetween(4, 3, 5)).toBe(true);
    expect(isBetween(3, 3, 3)).toBe(true);
    expect(isBetween(5, 3, 5)).toBe(true);
  });

  it("should return false if the number is not between the two bounds inclusive", () => {
    expect(isBetween(2, 3, 5)).toBe(false);
    expect(isBetween(6, 3, 5)).toBe(false);
  });

  it("should return false for any bounds if the number is NaN", () => {
    expect(isBetween(NaN, 3, 5)).toBe(false);
    expect(isBetween(4, NaN, 5)).toBe(false);
    expect(isBetween(4, 3, NaN)).toBe(false);
    expect(isBetween(NaN, NaN, NaN)).toBe(false);
  });

  it("should hendle Infinity and -Infinity as lower than or greater than checks", () => {
    expect(isBetween(4, -Infinity, Infinity)).toBe(true);
    expect(isBetween(10, 0, Infinity)).toBe(true);
    expect(isBetween(-10, 0, Infinity)).toBe(false);
    expect(isBetween(4, -Infinity, 5)).toBe(true);
    expect(isBetween(6, -Infinity, 5)).toBe(false);
  });
});
