import { min } from "@auaust/primitive-kit/numbers";

import { describe, expect, it } from "vitest";

describe("min()", () => {
  it("should work", () => {
    expect(min).toBeTypeOf("function");
  });
});
