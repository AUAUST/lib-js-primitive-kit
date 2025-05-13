import { toFunction } from "@auaust/primitive-kit/functions";

import { describe, expect, it } from "vitest";

describe("toFunction()", () => {
  it("should work", () => {
    expect(toFunction).toBeTypeOf("function");
  });
});
