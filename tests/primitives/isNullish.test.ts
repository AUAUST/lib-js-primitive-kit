import { isNullish } from "@auaust/primitive-kit/primitives";

import { describe, expect, it } from "vitest";

describe("isNullish()", () => {
  it("should work", () => {
    expect(isNullish(null)).toBe(true);
    expect(isNullish(undefined)).toBe(true);
    expect(isNullish(NaN)).toBe(true);

    expect(isNullish(0)).toBe(false);
    expect(isNullish(false)).toBe(false);
    expect(isNullish("")).toBe(false);
    expect(isNullish({})).toBe(false);
  });
});
