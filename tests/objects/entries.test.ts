import { entries } from "@auaust/primitive-kit/objects";

import { describe, expect, it } from "vitest";

describe("entries()", () => {
  it("should work", () => {
    expect(entries).toBeTypeOf("function");
  });
});
