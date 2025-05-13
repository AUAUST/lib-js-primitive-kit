import { nthIndexOf } from "@auaust/primitive-kit/strings";

import { describe, expect, it } from "vitest";

describe("nthIndexOf()", () => {
  it("should work", () => {
    expect(nthIndexOf).toBeTypeOf("function");
  });
});
