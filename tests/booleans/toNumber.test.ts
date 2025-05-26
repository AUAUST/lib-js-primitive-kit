import { toNumber } from "@auaust/primitive-kit/booleans";

import { describe, expect, it } from "vitest";

describe("toNumber()", () => {
  it("should work", () => {
    expect(toNumber(true)).toBe(1);
    expect(toNumber("0")).toBe(0);
    expect(toNumber("false")).toBe(0);
  });
});
