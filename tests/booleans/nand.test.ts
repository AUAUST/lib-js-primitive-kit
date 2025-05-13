import { nand } from "@auaust/primitive-kit/booleans";

import { describe, expect, it } from "vitest";

describe("nand()", () => {
  it("should work", () => {
    expect(nand).toBeTypeOf("function");
  });
});
