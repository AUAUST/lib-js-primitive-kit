import { or } from "@auaust/primitive-kit/numbers";

import { describe, expect, it } from "vitest";

describe("or()", () => {
  it("should work", () => {
    expect(or()).toBe(NaN);
    expect(or(2, 3)).toBe(2);
    expect(or(-1, 3)).toBe(-1);
    expect(or(0, NaN)).toBe(0);
    expect(or(NaN, Infinity, 0)).toBe(Infinity);
  });
});
