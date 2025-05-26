import { clamp } from "@auaust/primitive-kit/numbers";

import { describe, expect, it } from "vitest";

describe("clamp()", () => {
  it("should work", () => {
    expect(clamp(2, 3, 5)).toBe(3);
    expect(clamp(4, 3, 5)).toBe(4);
    expect(clamp(6, 3, 5)).toBe(5);
  });
});
