import { power } from "@auaust/primitive-kit/numbers";

import { describe, expect, it } from "vitest";

describe("power()", () => {
  it("should work", () => {
    expect(power(2, "0")).toBe(2 ** 0);
    expect(power(2, -3)).toBe(2 ** -3);
  });
});
