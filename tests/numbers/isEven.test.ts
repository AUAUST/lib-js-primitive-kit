import { isEven } from "@auaust/primitive-kit/numbers";

import { describe, expect, it } from "vitest";

describe("isEven()", () => {
  it("should work", () => {
    expect(isEven(0)).toBe(true);
    expect(isEven(2)).toBe(true);
    expect(isEven(3)).toBe(false);
    expect(isEven(2.42)).toBe(false);
    expect(isEven(2.0)).toBe(true);
    expect(isEven(-1)).toBe(false);
    expect(isEven(-1292)).toBe(true);
    expect(
      isEven({
        toString() {
          return "1.0";
        },
      })
    ).toBe(false);
  });
});
