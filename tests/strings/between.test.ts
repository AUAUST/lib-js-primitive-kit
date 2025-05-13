import { between } from "@auaust/primitive-kit/strings";

import { describe, expect, it } from "vitest";

describe("between()", () => {
  it("should work", () => {
    expect(between).toBeTypeOf("function");
  });
});
