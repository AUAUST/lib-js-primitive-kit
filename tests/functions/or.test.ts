import { or } from "@auaust/primitive-kit/functions";

import { describe, expect, it, vitest } from "vitest";

describe("or()", () => {
  it("should work", () => {
    const fn1 = vitest.fn(() => 1);
    const fn2 = vitest.fn(() => 2);
    const fn3 = vitest.fn(() => 3);

    expect(or(fn1, fn2, fn3)()).toBe(1);
    expect(fn1).toHaveBeenCalled();
    expect(fn2).not.toHaveBeenCalled();
    expect(fn3).not.toHaveBeenCalled();

    expect(or(undefined, fn2, fn3)()).toBe(2);
    expect(fn2).toHaveBeenCalled();

    expect(or(Symbol(), {}, fn3)()).toBe(3);
    expect(fn3).toHaveBeenCalled();

    expect(or(null, undefined, false)()).toBe(undefined);
  });
});
