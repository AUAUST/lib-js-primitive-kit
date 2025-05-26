import { multiply } from "@auaust/primitive-kit/numbers";

import { describe, expect, it } from "vitest";

describe("multiply()", () => {
  it("should work", () => {
    expect(multiply("0.3", new String("12"), 1)).toBe(0.3 * 12);
    expect(multiply(6, 3, 5, 10, 10)).toBe(6 * 3 * 5 * 10 * 10);
  });
});
