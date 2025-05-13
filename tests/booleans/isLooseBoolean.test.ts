import { isLooseBoolean } from "@auaust/primitive-kit/booleans";

import { describe, expect, it } from "vitest";

describe("isLooseBoolean()", () => {
  it("should work", () => {
    expect(isLooseBoolean).toBeTypeOf("function");
  });
});
