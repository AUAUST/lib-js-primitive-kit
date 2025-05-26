import { minMax } from "@auaust/primitive-kit/numbers";

import { describe, expect, it } from "vitest";

describe("minMax()", () => {
  it("should work", () => {
    expect(minMax("0.3", new String("12"), 1)).toEqual([0.3, 12]);
    expect(minMax(-Infinity, Infinity, 3)).toEqual([-Infinity, Infinity]);
    expect(minMax(NaN, 3)).toEqual([NaN, NaN]); // NaN is not comparable
  });
});
