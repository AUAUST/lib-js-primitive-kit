import { nor } from "@auaust/primitive-kit/booleans";

import { describe, expect, it } from "vitest";

describe("nor()", () => {
  it("should work", () => {
    expect(nor(true, true)).toBe(false);
    expect(nor(true, false)).toBe(false);
    expect(nor(false, true)).toBe(false);
    expect(nor(false, false)).toBe(true);

    expect(nor("false", true)).toBe(false);
  });
});
