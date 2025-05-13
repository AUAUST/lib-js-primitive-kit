import { none } from "@auaust/primitive-kit/booleans";

import { describe, expect, it } from "vitest";

describe("none()", () => {
  it("should work", () => {
    expect(none).toBeTypeOf("function");
  });
});
