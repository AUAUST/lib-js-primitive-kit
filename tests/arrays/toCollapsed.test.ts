import { toCollapsed } from "@auaust/primitive-kit/arrays";

import { describe, expect, it } from "vitest";

describe("toCollapsed()", () => {
  it("should work", () => {
    expect(toCollapsed).toBeTypeOf("function");
  });
});
