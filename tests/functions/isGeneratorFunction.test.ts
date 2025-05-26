import { isGeneratorFunction } from "@auaust/primitive-kit/functions";

import { describe, expect, it } from "vitest";

describe("isGeneratorFunction()", () => {
  it("should work", () => {
    expect(isGeneratorFunction(function* () {})).toBe(true);

    expect(isGeneratorFunction(() => {})).toBe(false);
    expect(isGeneratorFunction(async () => {})).toBe(false);
    expect(isGeneratorFunction(class {})).toBe(false);
  });
});
