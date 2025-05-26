import { isOdd } from "@auaust/primitive-kit/numbers";

import { describe, expect, it } from "vitest";

describe("isOdd()", () => {
  it("should work", () => {
    expect(isOdd(0)).toBe(false);
    expect(isOdd(2)).toBe(false);
    expect(isOdd(3)).toBe(true);
    expect(isOdd(2.42)).toBe(false);
    expect(isOdd(2.0)).toBe(false);
    expect(isOdd(-1)).toBe(true);
    expect(isOdd(-1292)).toBe(false);
    expect(
      isOdd({
        toString() {
          return "1.0";
        },
      })
    ).toBe(true);
  });
});
