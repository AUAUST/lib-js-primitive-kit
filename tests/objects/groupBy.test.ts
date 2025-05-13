import { groupBy } from "@auaust/primitive-kit/objects";

import { describe, expect, it } from "vitest";

describe("groupBy()", () => {
  it("should work", () => {
    expect(groupBy).toBeTypeOf("function");
  });
});
