import { isBoolean } from "@auaust/primitive-kit/booleans";

import { describe, expect, it } from "vitest";

describe("isBoolean()", () => {
  it("should work", () => {
    expect(isBoolean).toBeTypeOf("function");
  });
});
