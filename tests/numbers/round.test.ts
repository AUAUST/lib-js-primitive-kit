import { round } from "@auaust/primitive-kit/numbers";

import { describe, expect, it } from "vitest";

describe("round()", () => {
  it("should work", () => {
    expect(round(2.42)).toBe(2);
    expect(round(2.52)).toBe(3);
    expect(round(-2.42)).toBe(-2);
    expect(round("2.42")).toBe(2);
    expect(round("2.52")).toBe(3);

    expect(round(2.42, 0.5)).toBe(2.5);
    expect(round(2.52, 5)).toBe(5);

    expect(round(2.5, 0)).toBe(3);
    expect(round(2.5, NaN)).toBe(3);
  });
});
