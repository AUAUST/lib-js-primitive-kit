import { isAsyncGeneratorFunction } from "@auaust/primitive-kit/functions";

import { describe, expect, it } from "vitest";

describe("isAsyncGeneratorFunction()", () => {
  it("should work", () => {
    expect(isAsyncGeneratorFunction).toBeTypeOf("function");
  });
});
