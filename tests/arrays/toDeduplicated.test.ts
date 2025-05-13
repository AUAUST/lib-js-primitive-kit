import { toDeduplicated } from "@auaust/primitive-kit/arrays";

import { describe, expect, it } from "vitest";

describe("toDeduplicated()", () => {
  it("should work", () => {
    expect(toDeduplicated).toBeTypeOf("function");
  });
});
