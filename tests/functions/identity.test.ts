import { identity } from "@auaust/primitive-kit/functions";

import { describe, expect, it, vitest } from "vitest";

describe("identity()", () => {
  it("should work", () => {
    expect(identity(1)).toBe(1);
    expect(identity()).toBe(undefined);

    const value = Symbol();

    expect(identity(value)).toBe(value);

    const fn = vitest.fn(() => {});

    expect(identity(fn)).toBe(fn);
    expect(fn).not.toHaveBeenCalled();

    // @ts-expect-error
    expect(identity("foo", "bar", "baz")).toEqual("foo");
  });
});
