import { deepGet } from "@auaust/primitive-kit/objects";

import { describe, expect, it } from "vitest";

describe("deepGet()", () => {
  it("should work", () => {
    expect(deepGet).toBeTypeOf("function");
  });
});
