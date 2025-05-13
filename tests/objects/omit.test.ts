import { omit } from "@auaust/primitive-kit/objects";

import { describe, expect, it } from "vitest";

describe("omit()", () => {
  it("should work", () => {
    expect(omit).toBeTypeOf("function");
  });
});
