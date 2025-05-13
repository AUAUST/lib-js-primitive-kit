import { hasDuplicates } from "@auaust/primitive-kit/arrays";

import { describe, expect, it } from "vitest";

describe("hasDuplicates()", () => {
  it("should work", () => {
    expect(hasDuplicates).toBeTypeOf("function");
  });
});
