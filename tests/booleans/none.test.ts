import { none } from "@auaust/primitive-kit/booleans";

import { describe, expect, it } from "vitest";

describe("none()", () => {
  it("should work", () => {
    expect(none([false])).toBe(true);
    expect(none([false, false])).toBe(true);
    expect(none([false, false, true])).toBe(false);
    expect(none([false, false, "false"])).toBe(true);
    expect(none([false, false, "false"])).toBe(true);
  });
});
