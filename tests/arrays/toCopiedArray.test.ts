import { toCopiedArray } from "@auaust/primitive-kit/arrays";

import { describe, expect, it } from "vitest";

describe("toCopiedArray()", () => {
  it("should work", () => {
    expect(toCopiedArray).toBeTypeOf("function");
  });
});
