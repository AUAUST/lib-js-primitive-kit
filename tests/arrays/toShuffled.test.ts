import { toShuffled } from "@auaust/primitive-kit/arrays";

import { describe, expect, it } from "vitest";

describe("toShuffled()", () => {
  it("should work", () => {
    expect(toShuffled).toBeTypeOf("function");
  });
});
