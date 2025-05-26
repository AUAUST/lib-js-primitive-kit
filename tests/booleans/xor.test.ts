import { xor } from "@auaust/primitive-kit/booleans";

import { describe, expect, it } from "vitest";

describe("xor()", () => {
  it("should work", () => {
    expect(xor(true, true)).toBe(false);
    expect(xor(true, false)).toBe(true);
    expect(xor(false, true)).toBe(true);
    expect(xor(false, false)).toBe(false);

    expect(xor("false", false)).toBe(false);
  });
});
