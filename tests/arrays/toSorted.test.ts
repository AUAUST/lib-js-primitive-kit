import { toSorted } from "@auaust/primitive-kit/arrays";

import { describe, expect, it } from "vitest";

describe("toSorted()", () => {
  it("should work", () => {
    expect(toSorted).toBeTypeOf("function");
  });
});
