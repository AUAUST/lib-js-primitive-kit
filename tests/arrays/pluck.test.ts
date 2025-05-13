import { pluck } from "@auaust/primitive-kit/arrays";

import { describe, expect, it } from "vitest";

describe("pluck()", () => {
  it("should work", () => {
    expect(pluck).toBeTypeOf("function");
  });
});
