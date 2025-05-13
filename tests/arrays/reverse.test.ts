import { reverse } from "@auaust/primitive-kit/arrays";

import { describe, expect, it } from "vitest";

describe("reverse()", () => {
  it("should work", () => {
    expect(reverse).toBeTypeOf("function");
  });
});
