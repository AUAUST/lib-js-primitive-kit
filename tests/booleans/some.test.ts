import { some } from "@auaust/primitive-kit/booleans";

import { describe, expect, it } from "vitest";

describe("some()", () => {
  it("should work", () => {
    expect(some([false])).toBe(false);
    expect(some([false, false])).toBe(false);
    expect(some([false, false, true])).toBe(true);
    expect(some([false, false, "false"])).toBe(false);
    expect(some([false, false, "false"])).toBe(false);
  });
});
