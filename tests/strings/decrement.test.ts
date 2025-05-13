import { decrement } from "@auaust/primitive-kit/strings";

import { describe, expect, it } from "vitest";

describe("decrement()", () => {
  it("should work", () => {
    expect(decrement).toBeTypeOf("function");
  });
});
