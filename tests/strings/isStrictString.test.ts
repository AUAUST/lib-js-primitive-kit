import { isStrictString } from "@auaust/primitive-kit/strings";

import { describe, expect, it } from "vitest";

describe("isStrictString()", () => {
  it("should work", () => {
    expect(isStrictString).toBeTypeOf("function");
  });
});
