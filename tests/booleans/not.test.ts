import { not } from "@auaust/primitive-kit/booleans";

import { describe, expect, it } from "vitest";

describe("not()", () => {
  it("should work", () => {
    expect(not).toBeTypeOf("function");
  });
});
