import { isFunction } from "@auaust/primitive-kit/functions";

import { describe, expect, it } from "vitest";

describe("isFunction()", () => {
  it("should work", () => {
    expect(isFunction).toBeTypeOf("function");
  });
});
