import { floor } from "@auaust/primitive-kit/numbers";

import { describe, expect, it } from "vitest";

describe("floor()", () => {
  it("should work", () => {
    expect(floor(2.42)).toBe(2);
    expect(floor(-2.42)).toBe(-3);
    expect(floor("2.42")).toBe(2);
  });
});
