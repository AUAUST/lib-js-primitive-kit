import { isObject } from "@auaust/primitive-kit/primitives";

import { describe, expect, it } from "vitest";

describe("isObject()", () => {
  it("should work", () => {
    expect(isObject).toBeTypeOf("function");
  });
});
