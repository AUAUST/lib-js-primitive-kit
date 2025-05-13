import { concat } from "@auaust/primitive-kit/strings";

import { describe, expect, it } from "vitest";

describe("concat()", () => {
  it("should work", () => {
    expect(concat).toBeTypeOf("function");
  });
});
