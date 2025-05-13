import { isStrictArray } from "@auaust/primitive-kit/arrays";

import { describe, expect, it } from "vitest";

describe("isStrictArray()", () => {
  it("should only return true for non-empty arrays", () => {
    expect(isStrictArray([])).toBe(false);
    expect(isStrictArray([1, 2, 3])).toBe(true);
    expect(isStrictArray("foo")).toBe(false);
  });
});
