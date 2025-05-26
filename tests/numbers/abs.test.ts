import { abs } from "@auaust/primitive-kit/numbers";

import { describe, expect, it } from "vitest";

describe("abs()", () => {
  it("should work", () => {
    expect(abs(2)).toBe(2);
    expect(abs(-2)).toBe(2);
    expect(abs("2.42")).toBe(2.42);
    expect(abs("  -2.42 ")).toBe(2.42);
  });
});
