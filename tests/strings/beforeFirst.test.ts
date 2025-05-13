import { beforeFirst } from "@auaust/primitive-kit/strings";

import { describe, expect, it } from "vitest";

describe("beforeFirst()", () => {
  it("should work", () => {
    expect(beforeFirst).toBeTypeOf("function");
  });
});
