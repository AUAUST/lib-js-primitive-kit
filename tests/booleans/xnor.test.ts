import { xnor } from "@auaust/primitive-kit/booleans";

import { describe, expect, it } from "vitest";

describe("xnor()", () => {
  it("should work", () => {
    expect(xnor(true, true)).toBe(true);
    expect(xnor(true, false)).toBe(false);
    expect(xnor(false, true)).toBe(false);
    expect(xnor(false, false)).toBe(true);

    expect(xnor("false", false)).toBe(true);
  });
});
