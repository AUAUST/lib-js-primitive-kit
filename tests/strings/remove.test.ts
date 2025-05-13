import { remove } from "@auaust/primitive-kit/strings";

import { describe, expect, it } from "vitest";

describe("remove()", () => {
  it("should work", () => {
    expect(remove).toBeTypeOf("function");
  });
});
