import { average } from "@auaust/primitive-kit/numbers";

import { describe, expect, it } from "vitest";

describe("average()", () => {
  it("should work", () => {
    expect(average).toBeTypeOf("function");
  });
});
