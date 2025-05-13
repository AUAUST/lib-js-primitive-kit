import { sort } from "@auaust/primitive-kit/arrays";

import { describe, expect, it } from "vitest";

describe("sort()", () => {
  it("should work", () => {
    expect(sort).toBeTypeOf("function");
  });
});
