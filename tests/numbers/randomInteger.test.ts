import { randomInteger } from "@auaust/primitive-kit/numbers";

import { describe, expect, it, test } from "vitest";

describe("randomInteger()", () => {
  test.each(Array.from({ length: 20 }, (_, i) => i + 1))(
    "should return 0 or 1 by default (%i)",
    (i) => {
      const integer = randomInteger();

      expect(integer === 0 || integer === 1).toBe(true);
    }
  );

  test.each(Array.from({ length: 20 }, (_, i) => i + 1))(
    "should return an integer between the specified range (%i)",
    (i) => {
      expect(randomInteger(1, i)).toBeGreaterThanOrEqual(1);
      expect(randomInteger(1, i)).toBeLessThanOrEqual(i);
      expect(Number.isInteger(randomInteger(1, i))).toBe(true);

      expect(randomInteger(-i, 0)).toBeGreaterThanOrEqual(-i);
      expect(randomInteger(-i, 0)).toBeLessThanOrEqual(0);
      expect(Number.isInteger(randomInteger(-i, 0))).toBe(true);
    }
  );

  it("should handle equal range correctly", () => {
    expect(randomInteger(0, 0)).toBe(0);
    expect(randomInteger(5, 5)).toBe(5);
  });
});
