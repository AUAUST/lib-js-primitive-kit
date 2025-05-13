import { isString } from "@auaust/primitive-kit/strings";

import { describe, expect, it } from "vitest";

describe("isString()", () => {
  it("should work", () => {
    expect(isString).toBeTypeOf("function");
  });
});
