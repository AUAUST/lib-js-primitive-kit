import { toArray } from "@auaust/primitive-kit/arrays";

import { describe, expect, it } from "vitest";

describe("toArray()", () => {
  it("should work", () => {
    expect(toArray).toBeTypeOf("function");
  });
});
