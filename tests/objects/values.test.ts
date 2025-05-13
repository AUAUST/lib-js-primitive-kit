import { values } from "@auaust/primitive-kit/objects";

import { describe, expect, it } from "vitest";

describe("values()", () => {
  it("should work", () => {
    expect(values).toBeTypeOf("function");
  });
});
