import { beforeEnd } from "@auaust/primitive-kit/strings";

import { describe, expect, it } from "vitest";

describe("beforeEnd()", () => {
  it("should work", () => {
    expect(beforeEnd).toBeTypeOf("function");
  });
});
