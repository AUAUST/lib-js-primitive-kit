import { toFixed } from "@auaust/primitive-kit/numbers";

import { describe, expect, it } from "vitest";

describe("toFixed()", () => {
  it("should work", () => {
    expect(toFixed("2", "3")).toBe("2.000");
    expect(toFixed("2.42Bar", 0)).toBe("2");
  });
});
