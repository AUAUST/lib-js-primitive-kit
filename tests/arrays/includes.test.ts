import { includes } from "@auaust/primitive-kit/arrays";

import { describe, expect, it } from "vitest";

describe("includes()", () => {
  it("should work", () => {
    expect(includes([1, 2, 3], 2)).toBe(true);
    expect(includes(["1", "2", "3"], "2")).toBe(true);

    expect(includes([1, 2, 3], 4)).toBe(false);
    // @ts-expect-error – Basic type check (an array of numbers should not include a string)
    expect(includes([1, 2, 3], "2")).toBe(false);
  });
});
