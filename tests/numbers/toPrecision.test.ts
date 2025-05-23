import { toPrecision } from "@auaust/primitive-kit/numbers";

import { describe, expect, it } from "vitest";

describe("toPrecision()", () => {
  it("should work", () => {
    expect(toPrecision(1, 3)).toBe("1.00");
    expect(toPrecision("2", "3")).toBe("2.00");
  });
});
