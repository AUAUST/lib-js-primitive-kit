import { isMultipleOf } from "@auaust/primitive-kit/numbers";

import { describe, expect, it } from "vitest";

describe("isMultipleOf()", () => {
  it("should work", () => {
    expect(isMultipleOf(2, 2)).toBe(true);
    expect(isMultipleOf(3, 2)).toBe(false);
    expect(isMultipleOf(2.42, 2)).toBe(false);
    expect(isMultipleOf(2.0, 2)).toBe(true);
    expect(isMultipleOf(4.5, "1.5")).toBe(true);
  });
});
