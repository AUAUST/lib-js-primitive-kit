import { noop } from "@auaust/primitive-kit/functions";

import { describe, expect, it } from "vitest";

describe("noop()", () => {
  it("should work", () => {
    expect(noop()).toBe(undefined);
    expect(noop(1)).toBe(undefined);
    expect(noop(1, 2, 3)).toBe(undefined);
  });
});
