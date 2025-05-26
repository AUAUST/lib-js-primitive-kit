import { all } from "@auaust/primitive-kit/booleans";

import { describe, expect, it } from "vitest";

describe("all()", () => {
  it("should work", () => {
    expect(all([true])).toBe(true);
    expect(all([true, true])).toBe(true);
    expect(all([true, true, false])).toBe(false);
    expect(all([true, true, "true"])).toBe(true);
    expect(all([true, true, "false"])).toBe(false);
  });
});
