import { padEnd } from "@auaust/primitive-kit/strings";

import { describe, expect, it } from "vitest";

describe("padEnd()", () => {
  it("should work", () => {
    expect(padEnd).toBeTypeOf("function");
  });
});
