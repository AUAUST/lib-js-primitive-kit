import { F } from "@auaust/primitive-kit";

import { describe, expect, it } from "vitest";

describe("F() static class", () => {
  it("should be callable without new", () => {
    expect(F()).toBeTypeOf("function");
    expect(F(1)()).toBe(1);
    expect(F(() => 2)()).toBe(2);
  });
});
