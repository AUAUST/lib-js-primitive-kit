import { noop } from "@auaust/primitive-kit/functions";

import { describe, expect, it } from "vitest";

describe("noop()", () => {
  it("should work", () => {
    expect(noop).toBeTypeOf("function");
  });
});
