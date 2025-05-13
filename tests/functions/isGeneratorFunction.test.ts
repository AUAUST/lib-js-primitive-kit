import { isGeneratorFunction } from "@auaust/primitive-kit/functions";

import { describe, expect, it } from "vitest";

describe("isGeneratorFunction()", () => {
  it("should work", () => {
    expect(isGeneratorFunction).toBeTypeOf("function");
  });
});
