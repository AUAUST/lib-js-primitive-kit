import { isStrictObject } from "@auaust/primitive-kit/objects";

import { describe, expect, it } from "vitest";

describe("isStrictObject()", () => {
  it("should work", () => {
    expect(isStrictObject).toBeTypeOf("function");
  });
});
