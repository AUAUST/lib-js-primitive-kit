import { sum } from "@auaust/primitive-kit/numbers";

import { describe, expect, it } from "vitest";

describe("sum()", () => {
  it("should work", () => {
    expect(sum("0.3", new String("12"), 1)).toBe(13.3);
    expect(sum(4, 3)).toBe(4 + 3);
    expect(sum(6, 3, 5, 10, 10)).toBe(6 + 3 + 5 + 10 + 10);
  });
});
