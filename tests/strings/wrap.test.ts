import { wrap } from "@auaust/primitive-kit/strings";

import { describe, expect, it } from "vitest";

describe("wrap()", () => {
  it("should work", () => {
    expect(wrap).toBeTypeOf("function");
  });
});
