import { isBindable } from "@auaust/primitive-kit/functions";

import { describe, expect, it } from "vitest";

describe("isBindable()", () => {
  it("should work", () => {
    expect(isBindable).toBeTypeOf("function");
  });
});
