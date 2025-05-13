import { isNotBoolean } from "@auaust/primitive-kit/booleans";

import { describe, expect, it } from "vitest";

describe("isNotBoolean()", () => {
  it("should work", () => {
    expect(isNotBoolean).toBeTypeOf("function");
  });
});
