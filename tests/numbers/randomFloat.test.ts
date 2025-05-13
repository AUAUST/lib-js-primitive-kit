import { randomFloat } from "@auaust/primitive-kit/numbers";

import { describe, expect, it } from "vitest";

describe("randomFloat()", () => {
  it("should work", () => {
    expect(randomFloat).toBeTypeOf("function");
  });
});
