import { once } from "@auaust/primitive-kit/functions";

import { describe, expect, it } from "vitest";

describe("once()", () => {
  it("should work", () => {
    expect(once).toBeTypeOf("function");
  });
});
