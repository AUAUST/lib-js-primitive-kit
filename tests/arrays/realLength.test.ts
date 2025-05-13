import { realLength } from "@auaust/primitive-kit/arrays";

import { describe, expect, it } from "vitest";

describe("realLength()", () => {
  it("should work", () => {
    expect(realLength).toBeTypeOf("function");
  });
});
