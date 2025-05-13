import { randoms } from "@auaust/primitive-kit/arrays";

import { describe, expect, it } from "vitest";

describe("randoms()", () => {
  it("should work", () => {
    expect(randoms).toBeTypeOf("function");
  });
});
