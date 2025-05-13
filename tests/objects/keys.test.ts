import { keys } from "@auaust/primitive-kit/objects";

import { describe, expect, it } from "vitest";

describe("keys()", () => {
  it("should work", () => {
    expect(keys).toBeTypeOf("function");
  });
});
