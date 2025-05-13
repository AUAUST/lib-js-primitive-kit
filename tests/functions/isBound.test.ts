import { isBound } from "@auaust/primitive-kit/functions";

import { describe, expect, it } from "vitest";

describe("isBound()", () => {
  it("should work", () => {
    expect(isBound).toBeTypeOf("function");
  });
});
