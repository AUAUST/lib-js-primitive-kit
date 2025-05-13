import { first } from "@auaust/primitive-kit/arrays";

import { describe, expect, it } from "vitest";

describe("first()", () => {
  it("should work", () => {
    expect(first).toBeTypeOf("function");
  });
});
