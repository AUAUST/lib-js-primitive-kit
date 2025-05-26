import { min } from "@auaust/primitive-kit/numbers";

import { describe, expect, it } from "vitest";

describe("min()", () => {
  it("should work", () => {
    expect(min("0.3", new String("12"), 1)).toBe(0.3);
  });
});
