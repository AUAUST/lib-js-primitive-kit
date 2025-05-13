import { xor } from "@auaust/primitive-kit/booleans";

import { describe, expect, it } from "vitest";

describe("xor()", () => {
  it("should work", () => {
    expect(xor).toBeTypeOf("function");
  });
});
