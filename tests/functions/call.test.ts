import { call } from "@auaust/primitive-kit/functions";

import { describe, expect, it } from "vitest";

describe("call()", () => {
  it("should work", () => {
    expect(call).toBeTypeOf("function");
  });
});
