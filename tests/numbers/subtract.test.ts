import { subtract } from "@auaust/primitive-kit/numbers";

import { describe, expect, it } from "vitest";

describe("subtract()", () => {
  it("should work", () => {
    expect(subtract).toBeTypeOf("function");
  });
});
