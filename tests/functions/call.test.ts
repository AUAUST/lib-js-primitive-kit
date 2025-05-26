import { call } from "@auaust/primitive-kit/functions";

import { describe, expect, it, vitest } from "vitest";

describe("call()", () => {
  it("should work", () => {
    const fn = vitest.fn((...args: number[]) => {
      return args.reduce((a, b) => a + b, 0);
    });

    expect(call(fn, undefined, 1, 2, 3, 4)).toBe(10);
    expect(fn).toHaveBeenLastCalledWith(1, 2, 3, 4);

    expect(call(() => 1)).toBe(1);
    expect(call(() => undefined)).toBe(undefined);
    expect(call(() => {})).toBe(undefined);

    expect(call("", "fallback", 1, 2, 3, 4)).toBe("fallback");
    expect(call({}, "fallback", 1, 2, 3, 4)).toBe("fallback");
  });
});
