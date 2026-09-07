import { isNotEmpty } from "@auaust/primitive-kit/strings";

import { describe, expect, it } from "vitest";

describe("isNotEmpty()", () => {
  it("should return false for non-strings", () => {
    expect(isNotEmpty(new String("string"))).toBe(false);

    expect(isNotEmpty(0)).toBe(false);

    expect(isNotEmpty(new Number(0))).toBe(false);

    expect(isNotEmpty(false)).toBe(false);

    expect(isNotEmpty(new Boolean(false))).toBe(false);

    expect(isNotEmpty({})).toBe(false);

    expect(isNotEmpty([])).toBe(false);

    expect(isNotEmpty(null)).toBe(false);

    expect(isNotEmpty(undefined)).toBe(false);
  });

  it("should return false for empty strings", () => {
    expect(isNotEmpty("")).toBe(false);
  });

  it("should return true for primitive strings", () => {
    expect(isNotEmpty("string")).toBe(true);
  });
});
