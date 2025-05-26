import { hasDecimal } from "@auaust/primitive-kit/numbers";

import { describe, expect, it } from "vitest";

describe("hasDecimal()", () => {
  it("should work", () => {
    expect(hasDecimal(Math.PI)).toBe(true);
    expect(hasDecimal(2)).toBe(false);
    expect(hasDecimal(2.0)).toBe(false);
    expect(hasDecimal("2")).toBe(false);
    expect(hasDecimal(2.42)).toBe(true);
    expect(
      hasDecimal({
        toString() {
          return "1.1";
        },
      })
    ).toBe(true);
  });
});
