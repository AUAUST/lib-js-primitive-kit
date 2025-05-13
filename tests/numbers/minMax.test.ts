import { minMax } from "@auaust/primitive-kit/numbers";

import { describe, expect, it } from "vitest";

describe("minMax()", () => {
  it("should work", () => {
    expect(minMax).toBeTypeOf("function");
  });
});
