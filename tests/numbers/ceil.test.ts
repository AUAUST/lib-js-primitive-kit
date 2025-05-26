import { ceil } from "@auaust/primitive-kit/numbers";

import { describe, expect, it } from "vitest";

describe("ceil()", () => {
  it("should work", () => {
    expect(ceil(2.42)).toBe(3);
    expect(ceil(-2.42)).toBe(-2);
    expect(ceil("2.42")).toBe(3);
  });
});
