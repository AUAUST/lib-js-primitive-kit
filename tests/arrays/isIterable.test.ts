import { isIterable } from "@auaust/primitive-kit/arrays";

import { describe, expect, it } from "vitest";

describe("isIterable()", () => {
  it("should work", () => {
    expect(isIterable).toBeTypeOf("function");
  });
});
