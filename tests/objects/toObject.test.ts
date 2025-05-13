import { toObject } from "@auaust/primitive-kit/objects";

import { describe, expect, it } from "vitest";

describe("toObject()", () => {
  it("should work", () => {
    expect(toObject).toBeTypeOf("function");
  });
});
