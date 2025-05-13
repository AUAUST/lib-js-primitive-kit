import { toBoolean } from "@auaust/primitive-kit/booleans";

import { describe, expect, it } from "vitest";

describe("toBoolean()", () => {
  it("should work", () => {
    expect(toBoolean).toBeTypeOf("function");
  });
});
