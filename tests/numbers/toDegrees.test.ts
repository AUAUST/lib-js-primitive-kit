import { toDegrees } from "@auaust/primitive-kit/numbers";

import { describe, expect, it } from "vitest";

describe("toDegrees()", () => {
  it("should work", () => {
    expect(toDegrees(Math.PI)).toBeCloseTo(180);

    expect(toDegrees(Math.PI / 2)).toBeCloseTo(90);

    expect(toDegrees(0)).toBeCloseTo(0);

    expect(toDegrees(Math.PI / 4)).toBeCloseTo(45);
  });
});
