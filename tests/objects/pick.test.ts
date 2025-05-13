import { pick } from "@auaust/primitive-kit/objects";

import { describe, expect, it } from "vitest";

describe("pick()", () => {
  it("should work", () => {
    expect(pick).toBeTypeOf("function");
  });
});
