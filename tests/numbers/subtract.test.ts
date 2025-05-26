import { subtract } from "@auaust/primitive-kit/numbers";

import { describe, expect, it } from "vitest";

describe("subtract()", () => {
  it("should work", () => {
    expect(subtract("1000", 100, "20", new String("3"))).toBe(877);
    expect(subtract(6, 3, 5, "10", 10)).toBe(6 - 3 - 5 - 10 - 10);
  });
});
