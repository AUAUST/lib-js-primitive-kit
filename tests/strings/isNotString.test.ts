import { isNotString } from "@auaust/primitive-kit/strings";

import { describe, expect, it } from "vitest";

describe("isNotString()", () => {
  it("should work", () => {
    expect(isNotString).toBeTypeOf("function");
  });
});
