import { isInteger } from "@auaust/primitive-kit/numbers";

import { describe, expect, it } from "vitest";

describe("isInteger()", () => {
  it("should work", () => {
    expect(isInteger(2)).toBe(true);
    expect(isInteger("2")).toBe(true);
    expect(isInteger(2.42)).toBe(false);
    expect(isInteger(2.0)).toBe(true);
    expect(
      isInteger({
        toString() {
          return "1.0";
        },
      })
    ).toBe(true);
  });
});
