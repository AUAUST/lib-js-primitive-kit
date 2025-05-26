import { notAll } from "@auaust/primitive-kit/booleans";

import { describe, expect, it } from "vitest";

describe("notAll()", () => {
  it("should work", () => {
    expect(notAll([true])).toBe(false);
    expect(notAll([true, true])).toBe(false);
    expect(notAll([true, true, false])).toBe(true);
    expect(notAll([true, true, "false"])).toBe(true);
    expect(notAll([true, true, "false"])).toBe(true);
  });
});
