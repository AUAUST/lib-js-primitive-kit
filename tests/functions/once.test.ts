import { once } from "@auaust/primitive-kit/functions";

import { describe, expect, it, vitest } from "vitest";

describe("once()", () => {
  it("should lazy evaluate the function", () => {
    const fn = vitest.fn(() => 1);
    const onceFn = once(fn);

    expect(fn).toHaveBeenCalledTimes(0);

    expect(onceFn()).toBe(1);

    expect(fn).toHaveBeenCalledTimes(1);

    expect(onceFn()).toBe(1);
    expect(onceFn()).toBe(1);
    expect(onceFn()).toBe(1);

    expect(fn).toHaveBeenCalledTimes(1);
  });

  it("should expose the value or undefined if not called", () => {
    const onceFn = once(() => 1);

    expect(onceFn.value).toBe(undefined);
    expect(onceFn.called).toBe(false);

    expect(onceFn()).toBe(1);
    expect(onceFn.value).toBe(1);
    expect(onceFn.called).toBe(true);

    expect(onceFn()).toBe(1);
    expect(onceFn.value).toBe(1);
  });

  it("should be resettable", () => {
    const fn = vitest.fn(() => 1);
    const onceFn = once(fn);

    expect(onceFn()).toBe(1);
    expect(fn).toHaveBeenCalledTimes(1);
    expect(onceFn.value).toBe(1);

    onceFn.reset();

    expect(onceFn.value).toBe(undefined);
    expect(onceFn.called).toBe(false);

    expect(onceFn()).toBe(1);

    expect(fn).toHaveBeenCalledTimes(2);
  });
});
