import { isStrictString } from "@auaust/primitive-kit/strings";

import { describe, expect, it } from "vitest";

describe("isStrictString()", () => {
  it("should return false for non-strings", () => {
    expect(isStrictString(new String("string"))).toBe(false);
    expect(isStrictString(0)).toBe(false);
    expect(isStrictString(new Number(0))).toBe(false);
    expect(isStrictString(false)).toBe(false);
    expect(isStrictString(new Boolean(false))).toBe(false);
    expect(isStrictString({})).toBe(false);
    expect(isStrictString([])).toBe(false);
    expect(isStrictString(null)).toBe(false);
    expect(isStrictString(undefined)).toBe(false);
  });

  it("should return false for empty strings", () => {
    expect(isStrictString("")).toBe(false);
  });

  it("should return true for primitive strings", () => {
    expect(isStrictString("string")).toBe(true);
  });
});
