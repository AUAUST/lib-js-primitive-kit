import { last } from "@auaust/primitive-kit/arrays";

import { describe, expect, it } from "vitest";

describe("last()", () => {
  it("should work", () => {
    expect(last).toBeTypeOf("function");
  });
});
