import { pull } from "@auaust/primitive-kit/arrays";

import { describe, expect, it } from "vitest";

describe("pull()", () => {
  it("should work", () => {
    expect(pull).toBeTypeOf("function");
  });
});
