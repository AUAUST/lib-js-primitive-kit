import { remainder } from "@auaust/primitive-kit/numbers";

import { describe, expect, it } from "vitest";

describe("remainder()", () => {
  it("should work", () => {
    expect(remainder(2.5)).toBe(0.5); // implicit use of 1
    expect(remainder(4, 2)).toBe(0);
    expect(remainder(6, 4)).toBe(2);
  });
});
