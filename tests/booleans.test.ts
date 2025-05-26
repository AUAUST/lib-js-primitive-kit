import { B } from "@auaust/primitive-kit";

import { describe, expect, it } from "vitest";

describe("B() static class", () => {
  it("should be callable without new", () => {
    expect(B()).toBe(false);
    expect(B(1)).toBe(true);
    expect(B("")).toBe(false);
    expect(B("false")).toBe(false);
  });
});
