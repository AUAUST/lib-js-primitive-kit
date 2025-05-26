import { isSet } from "@auaust/primitive-kit/primitives";

import { describe, expect, it } from "vitest";

describe("isSet()", () => {
  it("should work", () => {
    expect(isSet(null)).toBe(false);
    expect(isSet(undefined)).toBe(false);

    // @ts-expect-error
    expect(isSet(typeof shooBadoo)).toBe(false);

    expect(isSet(NaN)).toBe(true);
    expect(isSet(0)).toBe(true);
    expect(isSet(false)).toBe(true);
    expect(isSet("")).toBe(true);
    expect(isSet({})).toBe(true);
  });
});
