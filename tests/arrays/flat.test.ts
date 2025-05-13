import { flat } from "@auaust/primitive-kit/arrays";

import { describe, expect, it } from "vitest";

describe("flat()", () => {
  it("should work", () => {
    expect(flat).toBeTypeOf("function");
  });
});
