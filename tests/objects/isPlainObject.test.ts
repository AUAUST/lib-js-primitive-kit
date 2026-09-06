import { isPlainObject } from "@auaust/primitive-kit/objects";

import { describe, expect, it } from "vitest";

describe("isPlainObject()", () => {
  it("should work", () => {
    expect(isPlainObject).toBeTypeOf("function");
  });
});
