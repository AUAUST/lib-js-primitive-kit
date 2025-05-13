import { padStart } from "@auaust/primitive-kit/strings";

import { describe, expect, it } from "vitest";

describe("padStart()", () => {
  it("should work", () => {
    expect(padStart).toBeTypeOf("function");
  });
});
