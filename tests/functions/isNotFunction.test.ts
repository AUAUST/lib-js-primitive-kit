import { isNotFunction } from "@auaust/primitive-kit/functions";

import { describe, expect, it } from "vitest";

describe("isNotFunction()", () => {
  it("should work", () => {
    expect(isNotFunction).toBeTypeOf("function");
  });
});
