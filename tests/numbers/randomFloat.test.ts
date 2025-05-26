import { randomFloat } from "@auaust/primitive-kit/numbers";

import { describe, expect, it, test } from "vitest";

describe("randomFloat()", () => {
  test.each(Array.from({ length: 10 }, (_, i) => i + 1))(
    "should return a float between 0 and 1 by default (%i)",
    (i) => {
      expect(randomFloat()).toBeGreaterThanOrEqual(0);
      expect(randomFloat()).toBeLessThanOrEqual(1);
    }
  );

  test.each(Array.from({ length: 20 }, (_, i) => i + 1))(
    "should return a float between the specified range (%i)",
    (i) => {
      expect(randomFloat(1, i)).toBeGreaterThanOrEqual(1);
      expect(randomFloat(1, i)).toBeLessThanOrEqual(i);

      expect(randomFloat(-i, 0)).toBeGreaterThanOrEqual(-i);
      expect(randomFloat(-i, 0)).toBeLessThanOrEqual(0);
    }
  );

  it("should handle same range correctly", () => {
    expect(randomFloat(0, 0)).toBe(0);
    expect(randomFloat(5, 5)).toBe(5);
  });
});
