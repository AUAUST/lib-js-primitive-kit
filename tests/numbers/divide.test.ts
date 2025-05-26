import { divide } from "@auaust/primitive-kit/numbers";

import { describe, expect, it } from "vitest";

describe("divide()", () => {
  it("should work", () => {
    expect(divide(new String("12"), "3", 1)).toBe(12 / 3);
    expect(divide(10, 5, 2)).toBe(10 / 5 / 2);
  });
});
