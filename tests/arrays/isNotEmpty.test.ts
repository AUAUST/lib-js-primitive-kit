import { isNotEmpty } from "@auaust/primitive-kit/arrays";

import { describe, expect, it } from "vitest";

describe("isNotEmpty()", () => {
  it("should only return true for non-empty arrays", () => {
    expect(isNotEmpty([])).toBe(false);
    expect(isNotEmpty([1, 2, 3])).toBe(true);
    expect(isNotEmpty("foo")).toBe(false);
  });
});
