import { random } from "@auaust/primitive-kit/strings";

import { describe, expect, it } from "vitest";

describe("random()", () => {
  it("should work", () => {
    expect(random).toBeTypeOf("function");
  });
});
