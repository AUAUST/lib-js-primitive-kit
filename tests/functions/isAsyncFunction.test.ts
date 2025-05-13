import { isAsyncFunction } from "@auaust/primitive-kit/functions";

import { describe, expect, it } from "vitest";

describe("isAsyncFunction()", () => {
  it("should work", () => {
    expect(isAsyncFunction).toBeTypeOf("function");
  });
});
