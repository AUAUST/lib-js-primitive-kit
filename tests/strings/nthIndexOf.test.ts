import { nthIndexOf } from "@auaust/primitive-kit/strings";

import { describe, expect, it } from "vitest";

describe("nthIndexOf()", () => {
  it("should work", () => {
    // 0-based index
    expect(nthIndexOf("1.2.0", ".", 0)).toBe(1);
    expect(nthIndexOf("1.2.0", ".", 1)).toBe(3);

    // Negative index looks from the end
    expect(nthIndexOf("1.2.0", ".", -1)).toBe(3);
    expect(nthIndexOf("9.8.7.6.5.4.3.2.1", ".", -3)).toBe(11);

    // If the separator is not found, -1 is returned
    expect(nthIndexOf("foo", "a", 0)).toBe(-1);
    expect(nthIndexOf("foo", "a", -1)).toBe(-1);

    // If the index is out of bounds, -1 is returned
    expect(nthIndexOf("1.2.0", ".", 2)).toBe(-1);
    expect(nthIndexOf("1.2.0", ".", -3)).toBe(-1);
  });
});
