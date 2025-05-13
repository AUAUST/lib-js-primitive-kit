import { equals } from "@auaust/primitive-kit/arrays";

import { describe, expect, it } from "vitest";

describe("equals()", () => {
  it("should work", () => {
    expect(equals).toBeTypeOf("function");
  });
});
