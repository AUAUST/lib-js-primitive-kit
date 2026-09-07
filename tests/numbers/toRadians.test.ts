import { toRadians } from "@auaust/primitive-kit/numbers";

import { describe, expect, it } from "vitest";

describe("toRadians()", () => {
  it("should work", () => {
    expect(toRadians(180)).toBeCloseTo(Math.PI);

    expect(toRadians(90)).toBeCloseTo(Math.PI / 2);

    expect(toRadians(0)).toBeCloseTo(0);

    expect(toRadians(360)).toBeCloseTo(2 * Math.PI);

    expect(toRadians(45)).toBeCloseTo(Math.PI / 4);
  });
});
