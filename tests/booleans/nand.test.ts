import { nand } from "@auaust/primitive-kit/booleans";

import { describe, expect, it } from "vitest";

describe("nand()", () => {
  it("should work", () => {
    expect(nand(true, true)).toBe(false);
    expect(nand(true, false)).toBe(true);
    expect(nand(false, true)).toBe(true);
    expect(nand(false, false)).toBe(true);

    expect(nand("false", true)).toBe(true);
  });
});
