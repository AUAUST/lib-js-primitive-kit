import { toReversed } from "@auaust/primitive-kit/arrays";

import { describe, expect, it } from "vitest";

describe("toReversed()", () => {
  it("should work", () => {
    expect(toReversed).toBeTypeOf("function");
  });
});
