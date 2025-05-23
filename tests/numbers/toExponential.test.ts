import { toExponential } from "@auaust/primitive-kit/numbers";

import { describe, expect, it } from "vitest";

describe("toExponential()", () => {
  it("should work", () => {
    expect(toExponential("2", "3")).toBe("2.000e+0");
  });
});
