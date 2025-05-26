import { isPositive } from "@auaust/primitive-kit/numbers";

import { describe, expect, it } from "vitest";

describe("isPositive()", () => {
  it("should work", () => {
    expect(isPositive(2)).toBe(true);
    expect(isPositive(0)).toBe(false);
    expect(isPositive(-2)).toBe(false);

    expect(isPositive("2.42")).toBe(true);
  });
});
