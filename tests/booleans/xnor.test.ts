import { xnor } from "@auaust/primitive-kit/booleans";

import { describe, expect, it } from "vitest";

describe("xnor()", () => {
  it("should work", () => {
    expect(xnor).toBeTypeOf("function");
  });
});
