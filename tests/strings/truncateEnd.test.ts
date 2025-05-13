import { truncateEnd } from "@auaust/primitive-kit/strings";

import { describe, expect, it } from "vitest";

describe("truncateEnd()", () => {
  it("should work", () => {
    expect(truncateEnd).toBeTypeOf("function");
  });
});
