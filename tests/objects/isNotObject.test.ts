import { isNotObject } from "@auaust/primitive-kit/objects";

import { describe, expect, it } from "vitest";

describe("isNotObject()", () => {
  it("should work", () => {
    expect(isNotObject).toBeTypeOf("function");
  });
});
