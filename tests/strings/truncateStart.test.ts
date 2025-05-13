import { truncateStart } from "@auaust/primitive-kit/strings";

import { describe, expect, it } from "vitest";

describe("truncateStart()", () => {
  it("should work", () => {
    expect(truncateStart).toBeTypeOf("function");
  });
});
