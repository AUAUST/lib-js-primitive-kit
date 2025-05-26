import { isNegative } from "@auaust/primitive-kit/numbers";

import { describe, expect, it } from "vitest";

describe("isNegative()", () => {
  it("should work", () => {
    expect(isNegative(2)).toBe(false);
    expect(isNegative(0)).toBe(false);
    expect(isNegative(-2)).toBe(true);

    expect(isNegative("2.42")).toBe(false);
    expect(isNegative("-4.24")).toBe(true);
  });
});
