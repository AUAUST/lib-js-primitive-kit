import { isObject } from "@auaust/primitive-kit/objects";

import { describe, expect, it } from "vitest";

describe("isObject()", () => {
  it("should work", () => {
    expect(isObject).toBeTypeOf("function");
  });
});
