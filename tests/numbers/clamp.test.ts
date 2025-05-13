import { clamp } from "@auaust/primitive-kit/numbers";

import { describe, expect, it } from "vitest";

describe("clamp()", () => {
  it("should work", () => {
    expect(clamp).toBeTypeOf("function");
  });
});
