import { clone } from "@auaust/primitive-kit/objects";

import { describe, expect, it } from "vitest";

describe("clone()", () => {
  it("should work", () => {
    expect(clone).toBeTypeOf("function");
  });
});
