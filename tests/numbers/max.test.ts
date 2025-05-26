import { max } from "@auaust/primitive-kit/numbers";

import { describe, expect, it } from "vitest";

describe("max()", () => {
  it("should work", () => {
    expect(max("0.3", new String("12"), 1)).toBe(12);
  });
});
